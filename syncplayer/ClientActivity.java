package com.sdpd.syncplayer;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class ClientActivity extends AppCompatActivity {

    RecyclerView rvHostList;
    HostListAdapter adapter;
    RecyclerView.LayoutManager layoutManager;

    Button btRefresh;

    NsdClient nsdClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_client);

        GlobalData.deviceRole = GlobalData.DeviceRole.CLIENT;

        rvHostList = findViewById(R.id.rv_hostList);
        layoutManager = new LinearLayoutManager(this);
        adapter = new HostListAdapter(this);

        rvHostList.setLayoutManager(layoutManager);
        rvHostList.setAdapter(adapter);

        nsdClient = new NsdClient(getApplicationContext(), adapter);
        nsdClient.discoverServices();

        btRefresh = findViewById(R.id.btn_refresh);
        btRefresh.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                nsdClient.stopDiscovery();
                adapter.clear();

                nsdClient = new NsdClient(getApplicationContext(), adapter);
                nsdClient.discoverServices();
            }
        });
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
    protected void onStop() {
        super.onStop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        nsdClient.stopDiscovery();
    }
}
