import React, { useState } from 'react';
import videoBg from "../assets/videoBg.mp4";
import logo from "../assets/logo.png";
import "../styles/Main.css";


const Main = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div className='main'>
            <nav className='navbar'>
                <div className='logo-container'>
                    <img src={logo} alt="AtomEye Logo" className="logo-img" />
                    <h2 className='logo-text'></h2>
                </div>

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><a href="#home" onClick={toggleMenu}>Home</a></li>
                    <li><a href="#features" onClick={toggleMenu}>Features</a></li>
                    <li><a href="#about" onClick={toggleMenu}>About</a></li>
                    <li><a href="https://illustrious-kashata-2b058e.netlify.app/" onClick={toggleMenu}>Ecolearn Ai✨</a></li>
                </ul>
            </nav>
            <div className='video-section'>
                <div className='overlay'></div>
                <video src={videoBg} autoPlay loop muted />
                <div className='content'>
                    <h1></h1>
                    <h6></h6>
                    <div className='button-container'>
                        <a href="http://localhost:3000/" className='btn'>EYE Diagnosis</a>
                        <a href="" className='btn'>Atmosphere</a>
                        <a href="http://localhost:3007/" className='btn'>Visual Buddy</a>
                    </div>
                </div>
            </div>
            <section id="features" className="features-section">
                <h2 >Our Features</h2>
                <div className="features-grid">
                    <div className="feature-category">
                        <h3>🌍 Environmental Health Monitoring</h3>
                        <div className="feature-list">
                            <div className="feature-item">
                                <span className="feature-icon">📊</span>
                                <div>
                                    <h4>Real-Time Air Quality Tracking</h4>
                                    <p>Live AQI updates with pollutant breakdowns (PM2.5, NO₂, O₃, etc.)</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🤖</span>
                                <div>
                                    <h4>AI-Powered Pollution & Fire Risk Prediction</h4>
                                    <p>Advanced forecasting using machine learning</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🔥</span>
                                <div>
                                    <h4>Wildfire Simulation</h4>
                                    <p>Predicts fire spread using real-time environmental data</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">☀️</span>
                                <div>
                                    <h4>UV & Pollen Alerts</h4>
                                    <p>Stay protected from sun exposure and allergens</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="feature-category">
                        <h3>👁️ AI-Powered Eye Health Analysis</h3>
                        <div className="feature-list">
                            <div className="feature-item">
                                <span className="feature-icon">📸</span>
                                <div>
                                    <h4>AI-Based Eye Scan</h4>
                                    <p>Upload an eye image to detect uveitis, cataracts, and more</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📍</span>
                                <div>
                                    <h4>Geolocation-Based Doctor Search</h4>
                                    <p>Find nearby specialists in seconds</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🔔</span>
                                <div>
                                    <h4>Health Alerts & Personalized Recommendations</h4>
                                    <p>Get guidance based on diagnosis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="feature-category">
                        <h3>🌱 AI-Driven Sustainability Education</h3>
                        <div className="feature-list">
                            <div className="feature-item">
                                <span className="feature-icon">📚</span>
                                <div>
                                    <h4>Interactive Learning Modules</h4>
                                    <p>Engaging content on climate change, ecosystems, and sustainability</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">💬</span>
                                <div>
                                    <h4>AI-Powered Q&A</h4>
                                    <p>Ask an AI about environmental topics for instant answers</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">👣</span>
                                <div>
                                    <h4>CO₂ Footprint Calculator</h4>
                                    <p>Understand your personal impact on the planet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="feature-category">
                        <h3>👤 AI Assistance for Visually Impaired Users</h3>
                        <div className="feature-list">
                            <div className="feature-item">
                                <span className="feature-icon">👥</span>
                                <div>
                                    <h4>Face & Object Recognition</h4>
                                    <p>AI identifies people, objects, and emotions</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📖</span>
                                <div>
                                    <h4>Real-Time Text Reading</h4>
                                    <p>Reads printed or handwritten text aloud</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🎙️</span>
                                <div>
                                    <h4>Voice Navigation</h4>
                                    <p>Hands-free access to website features through voice commands</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="about" className="about-section">
                <div className="about-container">
                    <h2>About AtmoEye</h2>
                    <div className="about-content">
                        <p className="about-text">
                            AtmoEye is the world's first AI-powered environmental and health intelligence platform, 
                            seamlessly integrating real-time air quality monitoring, AI-driven eye health analysis, 
                            wildfire risk assessment, and assistive technology for the visually impaired.
                        </p>
                        <p className="about-text">
                            Built with cutting-edge technologies like Next.js, TensorFlow, PyTorch, OpenCV, 
                            and Google APIs, AtmoEye leverages advanced machine learning, computer vision, 
                            and AI forecasting to deliver instant health insights, environmental risk predictions, 
                            and accessibility solutions.
                        </p>
                        <p className="about-text">
                            Our mission is to empower individuals with actionable data—whether it's predicting 
                            pollution trends, diagnosing eye conditions, preventing wildfire disasters, or assisting 
                            visually impaired users. By merging AI and real-world impact, AtmoEye is redefining 
                            health, safety, and accessibility in a rapidly changing world. 🚀
                        </p>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>About AtmoEye</h3>
                        <p>World's first AI-powered environmental and health intelligence platform.</p>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>Email: info@atmoeye.com</p>
                        <p>Phone: +91 ........</p>
                    </div>
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="social-links">
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2023 AtmoEye. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Main;