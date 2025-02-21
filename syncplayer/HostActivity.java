package com.sdpd.syncplayer;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;


import com.obsez.android.lib.filechooser.ChooserDialog;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class HostActivity extends AppCompatActivity {

    Button btnPickMedia;
    TextView tvChoosePasswordText;
    EditText etNewPassword;
    Button btnStartHosting;

    String lastSelectedMediaPath;
    Uri lastSelectedMediaUri;
    File lastSelectedMediaFile;
    private static final int REQUEST_CODE_PICK_MEDIA = 100;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_host);

        GlobalData.deviceRole = GlobalData.DeviceRole.HOST;

        initViews();
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
    }

    void initViews() {
        btnPickMedia = findViewById(R.id.btn_pickMedia);
        tvChoosePasswordText = findViewById(R.id.tv_choosePasswordText);
        etNewPassword = findViewById(R.id.et_newPassword);
        btnStartHosting = findViewById(R.id.btn_startHosting);

        // Choosing a media file
        btnPickMedia.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /*ChooserDialog dialog = new ChooserDialog(HostActivity.this);
                    dialog.withFilter(false, "mp3", "wav", "mp4", "mkv", "webm");
                    dialog.withChosenListener(new ChooserDialog.Result() {
                        @Override
                        public void onChoosePath(String path, File file) {
                            lastSelectedMediaPath = path;
                            lastSelectedMediaFile = file;

                            Toast.makeText(HostActivity.this, "Path: " + path, Toast.LENGTH_SHORT).show();
                        }
                    });

                    dialog.build().show();*/
                    openFileChooser();
                } catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(HostActivity.this, e.toString(), Toast.LENGTH_SHORT).show();
                    Log.i("HostActivity", "onClick: error: " + e.toString());
                }
            }
        });

        btnStartHosting.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String password = etNewPassword.getText().toString();
                GlobalData.password = password;

                if(lastSelectedMediaFile != null && lastSelectedMediaPath != null) {
                    Intent intent = new Intent(HostActivity.this, PlayerActivity.class);
                    intent.putExtra(getString(R.string.mediaSelectPathExtra), lastSelectedMediaPath);
                    intent.putExtra(getString(R.string.mediaSelectFileExtra), lastSelectedMediaFile);

                    startActivity(intent);
                } else {
                    Toast.makeText(HostActivity.this, "Choose a File", Toast.LENGTH_SHORT).show();
                }


            }
        });
    }

    // Open file picker using Storage Access Framework (SAF)
    private void openFileChooser() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("*/*"); // Allow all file types

        // Filter specific media formats
        String[] mimeTypes = {"audio/mpeg", "audio/wav", "video/mp4", "video/x-matroska", "video/webm"};
        intent.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes);

        startActivityForResult(intent, REQUEST_CODE_PICK_MEDIA);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_PICK_MEDIA && resultCode == RESULT_OK && data != null) {
            Uri uri = data.getData(); // Get the content URI
            if (uri != null) {
                lastSelectedMediaUri = uri;

                lastSelectedMediaFile = uriToFile(uri); // Get lastSelectedMediaFile

                lastSelectedMediaPath = lastSelectedMediaFile.getAbsolutePath();

                Log.i("HostActivity", "onActivityResult: lastSelectedMediaUri="+lastSelectedMediaUri);
                Log.i("HostActivity", "onActivityResult: lastSelectedMediaPath="+lastSelectedMediaPath);

                Toast.makeText(this, "File Selected: " + lastSelectedMediaPath, Toast.LENGTH_SHORT).show();
            }

        }
    }

    // Get absolute file path from URI (Only works for MediaStore URIs)
    private String getFileNameFromUri(Uri uri) {
        String fileName = null;
        Cursor cursor = getContentResolver().query(uri, null, null, null, null);
        if (cursor != null) {
            int nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
            if (nameIndex != -1 && cursor.moveToFirst()) {
                fileName = cursor.getString(nameIndex);
            }
            cursor.close();
        }
        return fileName;
    }
    private File uriToFile(Uri uri) {
        File file = new File(getCacheDir(), getFileNameFromUri(uri)); // Use correct filename
        try (InputStream inputStream = getContentResolver().openInputStream(uri);
             FileOutputStream outputStream = new FileOutputStream(file)) {

            byte[] buffer = new byte[1024];
            int length;
            while ((length = inputStream.read(buffer)) > 0) {
                outputStream.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }


}


