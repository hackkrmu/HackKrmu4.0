package com.sdpd.syncplayer;

import android.content.res.Configuration;
import android.net.Uri;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;


import androidx.annotation.OptIn;
import androidx.appcompat.app.AppCompatActivity;
import androidx.media3.common.C;
import androidx.media3.common.MediaItem;
import androidx.media3.common.Player;
import androidx.media3.common.util.UnstableApi;
import androidx.media3.datasource.DefaultDataSource;
import androidx.media3.datasource.DefaultHttpDataSource;
import androidx.media3.exoplayer.ExoPlayer;
import androidx.media3.exoplayer.SimpleExoPlayer;
import androidx.media3.exoplayer.source.MediaSource;
import androidx.media3.exoplayer.source.ProgressiveMediaSource;
import androidx.media3.ui.PlayerView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.io.File;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Time;

public class PlayerActivity extends AppCompatActivity {

    String TAG = "PlayerActivity";

    ExoPlayer player;
    PlayerView pvExoplayer;

    private RecyclerView rvClientList;
    ClientListAdapter adapter;
    private RecyclerView.LayoutManager layoutManager;

    private NsdHost nsdHost;

    private FileSender fs;
    private String path;
    private File file;

    SyncServer syncServer;
    private SyncClient syncClient;

    private long playbackPosition;

    SeekBar seekBar;
    TextView tvCurTime;
    TextView tvTotalTime;
    private Thread seekBarSyncThread;
    long currentPosition=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_player);

        Log.e(TAG, "onCreate");
        try {
            path = getIntent().getStringExtra(getString(R.string.mediaSelectPathExtra));
            file = (File) getIntent().getSerializableExtra(getString(R.string.mediaSelectFileExtra));

            ImageButton b = findViewById(R.id.btn_playPause);
            b.setOnClickListener(view -> {
                syncServer.togglePlayState();
            });

            initPlayer();
            initRvClientList();

            if (GlobalData.deviceRole == GlobalData.DeviceRole.HOST) {
                nsdHost = new NsdHost(getApplicationContext());    // why not accepting context parameter
                nsdHost.registerService();

                fs = new FileSender(path, 3078);

                syncServer = new SyncServer(this);

               /* player.addListener(new Player.Listener() {
                    @Override
                    public void onPlaybackStateChanged(int playbackState) {
                        Player.Listener.super.onPlaybackStateChanged(playbackState);
                        Toast.makeText(PlayerActivity.this, "PLAY: " + playbackState, Toast.LENGTH_SHORT).show();
                        syncServer.sync();
                    }
                });*/

                try {
                    InetAddress addr = InetAddress.getByName("127.0.0.1");
                    syncClient = new SyncClient(this, addr);
                } catch (UnknownHostException e) {
                    Log.e(TAG, e.toString());
                }
            } else if (GlobalData.deviceRole == GlobalData.DeviceRole.CLIENT) {
                InetAddress address = (InetAddress) getIntent().getSerializableExtra("HOST");
                syncClient = new SyncClient(this, address);
            }
        } catch (Exception e) {
            Log.e(TAG, e.toString());
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        Toast.makeText(this, "Destroy", Toast.LENGTH_SHORT).show();
        Log.d("PLAYER_ACTIVITY", "Destroy");

        if (GlobalData.deviceRole == GlobalData.DeviceRole.HOST) {
            nsdHost.unRegisterService();
            fs.harakiri();
            fs = null;
        }

        if (syncClient != null) syncClient.close();
        if (syncServer != null) syncServer.close();

        player.release();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        Log.e(TAG, "Config Changed");

        int currentOrientation = getResources().getConfiguration().orientation;
        ViewGroup.LayoutParams params = pvExoplayer.getLayoutParams();
        if (currentOrientation == Configuration.ORIENTATION_LANDSCAPE) {
            rvClientList.setVisibility(View.GONE);
            params.height = params.MATCH_PARENT;
            pvExoplayer.setLayoutParams(params);

            
        } else if (currentOrientation == Configuration.ORIENTATION_PORTRAIT) {
            rvClientList.setVisibility(View.VISIBLE);
            params.height = 270 * getResources().getDisplayMetrics().densityDpi / DisplayMetrics.DENSITY_DEFAULT;
            pvExoplayer.setLayoutParams(params);


        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);


    }

    @OptIn(markerClass = UnstableApi.class)
    public void initPlayer() {

        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        
        player = new ExoPlayer.Builder(this).build();
        pvExoplayer = findViewById(R.id.pv_exoplayer);
        pvExoplayer.setPlayer(player);
        pvExoplayer.setUseController(false);

        
        Uri fileUri = Uri.fromFile(file);
        MediaItem mediaItem = new MediaItem.Builder().setUri(fileUri).build();

        
        player.setMediaItem(mediaItem);
        player.prepare();
        player.play(); 
        tvCurTime = findViewById(R.id.tv_curTime);
        tvTotalTime = findViewById(R.id.tv_totalTime);
        seekBar = findViewById(R.id.sb_seekbar);

        
        if (GlobalData.deviceRole == GlobalData.DeviceRole.HOST) {
            seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
                @Override
                public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                    if (b) {  
                        long duration = player.getDuration();
                        if (duration != androidx.media3.common.C.TIME_UNSET) {  
                            playbackPosition = i * duration / 100;
                            syncServer.sync();
                        }
                    }
                }

                @Override
                public void onStartTrackingTouch(SeekBar seekBar) {
                }

                @Override
                public void onStopTrackingTouch(SeekBar seekBar) {
                }
            });
        }


        seekBarSyncThread = new Thread(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                Log.e("PLAYER", e.toString());
            }
            if (syncClient == null) return;
            while (syncClient.isRunning()) {
                runOnUiThread(() -> {
                    long duration = player.getDuration();
                    if (duration != androidx.media3.common.C.TIME_UNSET) {  
                        long pbp = getExactPlaybackPosition();
                        seekBar.setProgress((int) (pbp * 100 / duration));

                        String totalTime = String.format("%02d:%02d:%02d", (duration / 3600000) % 24, (duration / 60000) % 60, (duration / 1000) % 60);
                        String curTime = String.format("%02d:%02d:%02d", (pbp / 3600000) % 24, (pbp / 60000) % 60, (pbp / 1000) % 60);
                        tvTotalTime.setText(totalTime);
                        tvCurTime.setText(curTime);
                    }
                });

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    Log.e("PLAYER", e.toString());
                }
            }
        });
        seekBarSyncThread.start();
    }

    public void initRvClientList() {
        if (GlobalData.deviceRole == GlobalData.DeviceRole.HOST) {
            rvClientList = findViewById(R.id.rv_clientList);
            layoutManager = new LinearLayoutManager(this);
            adapter = new ClientListAdapter(this);

            rvClientList.setHasFixedSize(true);
            rvClientList.setLayoutManager(layoutManager);
            rvClientList.setAdapter(adapter);
        }
    }

    public long getPlaybackPosition() {
        return playbackPosition;
    }

    public long getExactPlaybackPosition() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                currentPosition = player.getCurrentPosition();
            }
        });
        return currentPosition;
    }

    public void seekTo(long l) {
        player.seekTo(l);
    }

    public void setPlay(boolean b) {
        player.setPlayWhenReady(b);
    }
}
