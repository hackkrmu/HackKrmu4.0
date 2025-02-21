import streamlit as st
import os
import tempfile
from moviepy.editor import VideoFileClip, concatenate_videoclips
import numpy as np

st.markdown("""
<style>
    .stApp {
            background-image: url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhEvu8nWpuNztuja9BghsTiTWrQDdiA_qIfhvs98BIGUHIReBc7KGMhgpohWLG12kmgIiu_gK93_T4ZZxJo_dHcr0eskNESN1KHwsBg5jHitr6_pR3bqErKsAGz47xODEiI8rx0LXqtUrDBQeHVWSdLeelbhwgVnTBZHnZf1z4Ne7cKSgJvNwR0yVf0p7g/s4096/Bgimg.jpg");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
            
    .title {
        font-size: 2.5rem;
        font-weight: bold;
        color: #14202C;
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .subtitle {
        font-size: 1.2rem;
        color: #666;
        text-align: center;
        margin-bottom: 2rem;
    }

    .stFileUploader > div > div {
        padding: 1.5rem;
        background-color: #ffffff;
        border: 2px dashed #3B82F6;
        border-radius: 10px;

    }

    .stButton > button {
        font-size: 1rem;
        font-weight: bold;
        border: none;
        width: 100%;
        background-color: #3B82F6;
        color: white;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;

    }

    .stButton > button:hover {
        background-color: #2563EB;
    }

    .stSlider > div {
        margin-top: 1rem;
    }

    .stProgress > div > div {
        background-color: #3B82F6;
    }

    .feature-card {
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
        opacity: 0.5;
        transition: all 0.3s ease;
}

    .feature-card:hover {
        opacity: 1;
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
    .feature-card h3 {
        color: #14202C;
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
        font-weight: bold;

    }

    .feature-card p {
        font-size: 1rem;
        color: #666;
    }

    .download-section {
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-top: 2rem;
        background-color: #ffffff;
        padding: 1.5rem;

    }

    .download-section h3 {
        font-size: 1.5rem;
        font-weight: bold;
        color: #14202C;
        margin-bottom: 1rem;
    }
    .footer {
        background-color: rgba(255, 255, 255, 0.5);
        padding: 1.5rem;
        border-radius: 12px;
        margin-top: 3rem;
        backdrop-filter: blur(5px);
    }  
    .footer-button {
        text-align: center;
        text-decoration: none;
        display: block;
        border: none;
        cursor: pointer;
        transition: all 0.3s;
        position: relative;
        background-color: rgba(0, 0, 0, 0.3);
        color: white !important;
        border-radius: 8px;
        padding: 0.5rem 15rem;
        font-size: 1.5rem;
        margin: 0.5rem 0;
        width: 100%;

    }
    
    .footer-button:hover {
        background-color: rgba(0, 0, 0, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
    }
            
    .footer-header {
        font-weight: bold;
        margin-bottom: 0.7rem;
        color: #ffffff;
    }

    .feature-card1 {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        margin: 2rem 0;
        opacity: 0.5;
        transition: all 0.3s ease;
        background-color: #ffffff;
        padding: 2rem;
        border-radius: 12px;
    }

    .feature-card1:hover {
        opacity: 1;
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
    .feature-card1 h3 {
        font-size: 2rem;
        font-weight: bold;
        color: #14202C;
        margin-bottom: 0.75rem;
    }

    .feature-card1 p {
        font-size: 2rem;
        color: #666;
    }
    
          

</style>
""", unsafe_allow_html=True)

def process_video(input_path, threshold, progress_callback):
    try:
        progress_callback(10, "Loading video...")
        video = VideoFileClip(input_path)
        
        progress_callback(20, "Analyzing audio...")
        audio_chunks = []
        duration = video.duration
        chunk_duration = 0.1
        
        chunk_count = int(duration / chunk_duration)
        for i, t in enumerate(np.arange(0, duration, chunk_duration)):
            end_t = min(t + chunk_duration, duration)
            chunk = video.subclip(t, end_t).audio
            if chunk is not None:
                audio_chunks.append((t, np.sqrt(np.mean(chunk.to_soundarray()**2))))
            progress = 20 + int((i / chunk_count) * 30)
            progress_callback(progress, "Analyzing audio...")
        
        progress_callback(50, "Detecting silent parts...")
        nonsilent_chunks = [t for t, volume in audio_chunks if volume > threshold]
        
        if not nonsilent_chunks:
            raise Exception("No non-silent parts found!")
        
        progress_callback(60, "Creating clips...")
        clips = []
        start_time = nonsilent_chunks[0]
        prev_time = start_time
        
        for t in nonsilent_chunks[1:]:
            if t - prev_time > chunk_duration * 1.5:
                clips.append(video.subclip(
                    max(0, start_time - chunk_duration),
                    min(duration, prev_time + chunk_duration)
                ))
                start_time = t
            prev_time = t
        
        clips.append(video.subclip(
            max(0, start_time - chunk_duration),
            min(duration, prev_time + chunk_duration)
        ))
        
        progress_callback(80, "Combining clips...")
        final_video = concatenate_videoclips(clips)
        
        output_path = os.path.splitext(input_path)[0] + "_processed.mp4"
        final_video.write_videofile(
            output_path,
            codec='libx264',
            audio_codec='aac',
            logger=None
        )
        
        video.close()
        final_video.close()
        return output_path
        
    except Exception as e:
        raise e

def main():

    logo_url = "https://blogger.googleusercontent.com/img/a/AVvXsEhDHXYq6vkcAo6H22qQ-8_M6btXkRpih6Kb9W0f4a_0KBnP5OEhvXGeLN6B0rv25qrv-ytHmEJgQ7M_wnAmTDMSJlqVIsVWbeShlcI7cz8IUeJuKswge7IzkUkTYUyOK5QQonDxrBri2Q-M5mGV7FpjmwbKP1vcReJT8RrmUPFSwQwcr33Y_DT6Z_GKh4Q"

    col1, col2 = st.columns([4, 1])

    with col1:
        st.title("CutZero - Your Video Editing Assistant")

    with col2:
        st.image(logo_url, use_container_width=True, caption="", width=100)
    

    st.markdown("""
    <p style='text-align: center; color: #ffffff; margin-bottom: 2rem;'>
        Upload your video and let our AI-powered system remove blank and silent frames in seconds.
    </p>
    """, unsafe_allow_html=True)
    
    uploaded_file = st.file_uploader("Select video file", 
                                    type=["mp4", "avi", "mov", "mkv"],
                                    accept_multiple_files=False)
    
    threshold = st.slider("Silence Threshold", 
                         min_value=0.001, 
                         max_value=0.2,
                         value=0.041,
                         step=0.001,
                         format="%.3f")
    
    if uploaded_file is not None:
        if st.button("Process Video"):
            progress_bar = st.progress(0)
            status_text = st.empty()
            
            def update_progress(progress, message):
                progress_bar.progress(progress)
                status_text.markdown(f"**Status:** {message}")
            
            with tempfile.TemporaryDirectory() as tmp_dir:
                input_path = os.path.join(tmp_dir, uploaded_file.name)
                with open(input_path, "wb") as f:
                    f.write(uploaded_file.getbuffer())
                
                try:
                    output_path = process_video(input_path, threshold, update_progress)

                    st.markdown("---")
                    st.subheader("Your Processed Video is Ready!")
                    with open(output_path, "rb") as f:
                        st.download_button(
                            label="Download Edited Video",
                            data=f,
                            file_name=os.path.basename(output_path),
                            mime="video/mp4"
                        )
                    
                except Exception as e:
                    st.error(f"Error processing video: {str(e)}")
    
    st.markdown("---")
    st.subheader("Smart Video Processing Features")
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown("""
        <div class="feature-card">
            <h3>AI-Powered Silence Detection</h3>
            <p>Advanced algorithms identify and remove silent intervals with perfect accuracy</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="feature-card">
            <h3>Multi-Format Support</h3>
            <p>Works with MP4, MOV, AVI, and other popular video formats</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="feature-card">
            <h3>Fast Processing</h3>
            <p>Typically processes videos 2-4x faster than realtime duration</p>
        </div>
        """, unsafe_allow_html=True)

    st.markdown(
        """
        <div class="feature-card1" style="display: flex; justify-content: center; align-items: center; text-align: center;">
            <div class="footer-column">
               <a href="https://cutzero-automating-video-iahbobo.gamma.site/" target="_blank">
                    <div class="footer-button" style="display: inline-block; padding: 10px 250px; background-color: #000000; color: white; border-radius: 5px;   text-decoration: none;">
                        Overview
                    </div>
                </a>
            </div>
        </div>
        """,
    unsafe_allow_html=True
)

if __name__ == "__main__":
    main()