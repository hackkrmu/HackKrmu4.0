import googlemaps

# Initialize the Google Maps client
API_KEY = 'xyz'  # API key
gmaps = googlemaps.Client(key=API_KEY)

def get_directions(start_place, destination_place):
    try:
        start_coords = gmaps.geocode(start_place)
        destination_coords = gmaps.geocode(destination_place)

        if start_coords and destination_coords:
            start_latlng = start_coords[0]['geometry']['location']
            dest_latlng = destination_coords[0]['geometry']['location']

            directions = gmaps.directions(
                origin=start_latlng,
                destination=dest_latlng,
                mode="driving"
            )
            steps = directions[0]['legs'][0]['steps']
            waypoints = []

            for step in steps:
                lat = step['end_location']['lat']
                lng = step['end_location']['lng']
                waypoints.append((lat, lng))

            return waypoints
        else:
            print("Geocoding failed for one of the locations.")
    except googlemaps.exceptions.ApiError as e:
        print(f"API error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")


start_place = "Pocket B2, Mayur Vihar Phase 3, Delhi 110096"
destination_place = "SFS flats, Mayur Vihar Phase 3, Delhi 110096"

waypoints = get_directions(start_place, destination_place)

print("Waypoints along the route:")
for wp in waypoints:
    print(f"Lat: {wp[0]}, Lng: {wp[1]}")
