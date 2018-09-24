"use strict"
import React from 'react';
import {Image, Row, Col, Well, Button} from "react-bootstrap";

class About extends React.Component{ 
    render () {
        return (
            <div id="cv" className="instaFade">
                <div className="mainDetails">
                    <div id="headshot" className="quickFade">
                        <Image src="/staticImages/me.jpg" width={100} height={100} responsive alt="Hoang Thanh Tan" />
                    </div>
                    
                    <div id="name">
                        <h1 className="quickFade delayTwo">Hoang Thanh Tan</h1>
                        <h2 className="quickFade delayThree">Software Developer</h2>
                    </div>
                    
                    <div id="contactDetails" className="quickFade delayFour">
                        <ul>
                            <li><a href="mailto:thanhtan190@gmail.com" target="_blank"><i className="fas fa-envelope-square"></i>   thanhtan190@gmail.com</a></li>
                            <li><a href="https://github.com/thanhtan190"><i className="fab fa-github"></i>  Thanh Tan Hoang</a></li>
                            <li><i className="fas fa-phone"></i>  07028300398</li>
                        </ul>
                    </div>
                    <div className="clear"></div>
                </div>
                
                <div id="mainArea" className="quickFade delayFive">
                    <section>
                        <article>
                            <div className="sectionTitle">
                                <h1>Personal Profile</h1>
                            </div>
                            
                            <div className="sectionContent">
                                <p>I am currently working on a web application as data analysis solution project. In this project I have
                                    been able to learn how to write code efficiently in a team, improve legacy code and implement new
                                    features according to the client’s needs. I was also able to increase my expertise in Javascript and improve
                                    my understanding of how the layers of a large project come together. I would like to improve on these
                                    skills and learn new ones with incoming challenge.</p>
                            </div>
                        </article>
                        <div className="clear"></div>
                    </section>
                    
                    
                    <section>
                        <div className="sectionTitle">
                            <h1>Work Experience</h1>
                        </div>
                        
                        <div className="sectionContent">
                            <article>
                                <h2>Front End Developer at Keepdata</h2>
                                <p className="subDetails">January 2017 - Present</p>
                            </article>
                            
                            <article>
                                <h2>Software Developer at FPT Software HCM</h2>
                                <p className="subDetails">August 2014 - May 2016</p>
                            </article>
                        </div>
                        <div className="clear"></div>
                    </section>
                    
                    
                    <section>
                        <div className="sectionTitle">
                            <h1>Key Skills</h1>
                        </div>
                        
                        <div className="sectionContent">
                            <ul className="keySkills">
                                <li>Javascript</li>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>Golang</li>
                                <li>PHP</li>
                                <li>Java</li>
                                <li>Japanese N2</li>
                                <li>TOIEC 550</li>
                            </ul>
                        </div>
                        <div className="clear"></div>
                    </section>
                    
                    
                    <section>
                        <div className="sectionTitle">
                            <h1>Education</h1>
                        </div>
                        
                        <div className="sectionContent">
                            <article>
                                <h2>University of Science</h2>
                                <p className="subDetails">Bachelor</p>
                            </article>
                        </div>
                        <div className="clear"></div>
                    </section>
                    
                </div>
            </div>
        )
    }
}

export default About;