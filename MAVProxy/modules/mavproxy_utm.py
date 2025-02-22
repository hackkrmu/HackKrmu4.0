#!/usr/bin/env python
'''UTM Module for MAVProxy'''
import time
import math
import threading
from pymavlink import mavutil
from MAVProxy.modules.lib import mp_module

class UTMModule(mp_module.MPModule):
    def __init__(self, mpstate):
        super(UTMModule, self).__init__(mpstate, "utm", "Unmanned Traffic Management module", public=True)
        self.last_check = time.time()
        self.enable = False
        self.add_command('utm', self.cmd_utm, "Enable/Disable UTM Loop")
        self.add_command('check', self.cmd_check, "Perform a manual check")

        # Set SR0_POSITION and SR1_POSITION for position updates
        self.set_param("SR0_POSITION", 10)
        self.set_param("SR1_POSITION", 10)

    def mavlink_packet(self, m):
        '''Handle a MAVLink packet''' 
        if time.time() - self.last_check > 2:
            if self.enable:
                print("MAVLink packet received, checking distance")
                threading.Thread(target=self.check_drones, daemon=True).start()
            self.last_check = time.time()

    def check_drones(self):
        '''Check distances between all drones'''
        print("Checking distance, in check_drones")
        masters = self.mpstate.mav_master
        for i in range(len(masters)):
            for j in range(i + 1, len(masters)):
                m1, m2 = masters[i], masters[j]
                loc1 = self.get_location(m1)
                loc2 = self.get_location(m2)

                # print("loc1: ", str(loc1), ", loc2: ", str(loc2))
                
                if loc1 and loc2:
                    dist = self.calculate_distance(loc1, loc2)
                    print(f"Drones {i+1} & {j+1} → {dist:.2f}m apart")
                    
                    if dist <= 10:
                        print(f"Drones {i+1} & {j+1} within 10m, potential collision")

                    if self.is_collision_course(m1, m2, loc1, loc2):
                        print(f"Collision warning, Drones {i+1} & {j+1} on crash course")

    def get_location(self, master):
        '''Retrieve the current location of the drone'''
        try:
            msg = master.recv_match(type='GLOBAL_POSITION_INT', blocking=True, timeout=1)
            if msg:
                return (msg.lat / 1e7, msg.lon / 1e7, msg.relative_alt / 1e3)
        except Exception as e:
            print(f"Location fetch failed: {e}")
        return None

    def calculate_distance(self, loc1, loc2):
        '''Calculate the 3D distance between two locations'''
        try:
            dx = (loc1[0] - loc2[0]) * 111139
            dy = (loc1[1] - loc2[1]) * 111139
            dz = loc1[2] - loc2[2]
            return math.sqrt(dx**2 + dy**2 + dz**2)
        except Exception as e:
            print(f"Distance calculation error: {e}\n\nReturning infinite")
            return float('inf')

    def is_collision_course(self, m1, m2, loc1, loc2):
        '''Check if two drones are moving toward each other'''
        try:
            v1 = self.get_velocity(m1)
            v2 = self.get_velocity(m2)
            if v1 and v2:
                rel_x, rel_y, rel_z = loc2[0] - loc1[0], loc2[1] - loc1[1], loc2[2] - loc1[2]
                dot_product = (rel_x * (v2[0] - v1[0])) + (rel_y * (v2[1] - v1[1])) + (rel_z * (v2[2] - v1[2]))
                return dot_product < 0  # Negative means moving toward each other
        except Exception as e:
            print(f"Collision check failed: {e}")
        return False

    def get_velocity(self, master):
        '''Retrieve the current velocity of the drone'''
        try:
            msg = master.recv_match(type='VFR_HUD', blocking=True, timeout=1)
            if msg:
                vx = msg.groundspeed * math.cos(math.radians(msg.heading))
                vy = msg.groundspeed * math.sin(math.radians(msg.heading))
                vz = msg.climb
                return (vx, vy, vz)
        except Exception as e:
            print(f"Velocity fetch failed: {e}")
        return None

    def set_param(self, param_name, value):
        '''Set a parameter using MAVLink'''
        if not self.mpstate.master:
            print(f"Mavlink No master connection available to set {param_name}")
            return

        print(f"Setting {param_name} to {value}")
        try:
            msg = self.mpstate.master.mav.param_set_encode(
                0, # Target sys
                0,  # Target comp
                param_name.encode(),  # Parameter name
                float(value),  # Parameter value
                mavutil.mavlink.MAV_PARAM_TYPE_REAL32  # Parameter type
            )
            self.mpstate.master.mav.send(msg)
            # print(f"Successfully sent request to set {param_name} to {value}")
        except Exception as e:
            print(f"Failed to set {param_name}: {e}")

    def cmd_utm(self, args):
        '''Command to enable/disable UTM'''
        self.enable = not self.enable
        print(f"{'Enabled UTM system' if self.enable else 'Disabled UTM system'}")

    def cmd_check(self, args):
        '''Command to manually check for collisions'''
        # print("Manual check triggered")
        threading.Thread(target=self.check_drones, daemon=True).start()

def init(mpstate):
    '''Initialize module'''
    return UTMModule(mpstate)
