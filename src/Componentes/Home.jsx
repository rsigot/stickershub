import React, { useEffect } from 'react';
import './Css/Home.css'; // Asegúrate de tener el CSS correspondiente

const Home = () => {
    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
    
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              navLinks.forEach(link => {
                link.classList.remove('active');
                if (entry.target.id === link.getAttribute('href').substring(1)) {
                  link.classList.add('active');
                }
              });
            }
          });
        }, {
          threshold: 0.7
        });
    
        sections.forEach(section => {
          observer.observe(section);
        });
    
        return () => {
          if (sections.length && observer) {
            sections.forEach(section => observer.unobserve(section));
          }
        };
      }, []);
    
      const enterSite = () => {
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
          mainContainer.classList.add('entered');
        } else {
          console.error('Main container not found');
        }
      };
      
    return (
        <>
            {/* Welcome Page */}
            <div className="welcome-section" id="welcome">
                <div className="content">
                    <button onClick={() => enterSite('create-account')}>Create an Account!</button>
                </div>
                <button onClick={enterSite}>Enter!</button>
                <img src="https://i.imgur.com/g8BzmYD.png" alt="STICKERSHUB1" />
            </div>

            {/* Header and Navigation */}
            <header id="main-header">
                <button className="login-button">Login</button>
                <button onClick={() => enterSite('create-account')} style={{
                    position: 'absolute',
                    top: '10px',
                    left: '90px',
                    backgroundColor: '#ff6347',
                    border: 'none',
                    padding: '10px 20px',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    borderRadius: '5px'
                }}>Create an Account!</button>
                <nav>
                    <img src="https://i.imgur.com/g8BzmYD.png" alt="STICKERSHUB1" style={{ width: '300px' }} />
                    <ul>
                        <li><a href="#main">Main</a></li>
                        <li><a href="#dashboard">Dashboard</a></li>
                        <li><a href="#profit-tracker">Profit Tracker</a></li>
                        <li><a href="#divine">Divine</a></li>
                        <li><a href="#minigames">Minigames</a></li>
                        <li><a href="#wiki">SHWiki</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            {/* Sections */}
            <section id="main">
                <h2>Main</h2>

                {/* Profit Tracker Section */}
                <div className="profit-tracker" style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', color: '#fff' }}>
                    <img src="https://i.imgur.com/6IHmMft.gif" alt="Profit Tracker Image" style={{ width: '330px', height: '330px', marginRight: '20px', borderRadius: '10px' }} />
                    <div className="profit-tracker-description">
                        <h3 style={{ color: '#ff6347' }}>Profit Tracker</h3>
                        <p>Our flagship system is designed to maximize user engagement and rewards. Track and optimize your earnings in real-time with various missions and reward structures.</p>
                        <p>Create strategies to influence the game in your favor, discover the in-game market, and explore all its possibilities!</p>
                    </div>
                </div>

                {/* Divine Section */}
                <div className="divine" style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', color: '#fff' }}>
                    <img src="https://i.imgur.com/HCWYN0k.gif" alt="Divine Image" style={{ width: '330px', height: '330px', marginRight: '20px', borderRadius: '10px' }} />
                    <div className="divine-description">
                        <h3 style={{ color: '#ff6347' }}>Divine</h3>
                        <img src="https://i.imgur.com/vANNxIp.jpeg" alt="Quokka astronauta 'Coming Soon'" style={{ width: '200px' }} />
                        <p>This version is one of our featured projects but right now it is in a state of maintenance because we are in the development phase, we appreciate your patience and understanding!</p>
                        <p>Stay alert for all updates so you don't miss the openings!</p>
                    </div>
                </div>

                {/* Minigames Section */}
                <div className="minigames" style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', color: '#fff' }}>
                    <img src="https://i.imgur.com/N0ItlEO.jpeg" alt="Minigames Image" style={{ width: '330px', height: '330px', marginRight: '20px', borderRadius: '10px' }} />
                    <div className="minigames-description">
                        <h3 style={{ color: '#ff6347' }}>Minigames</h3>
                        <img src="https://i.imgur.com/vANNxIp.jpeg" alt="Quokka astronauta 'Coming Soon'" style={{ width: '200px' }} />
                        <p>This version is one of our featured projects but right now it is in a state of maintenance because we are in the development phase, we appreciate your patience and understanding!</p>
                        <p>Stay alert for all updates so you don't miss the openings!</p>
                    </div>
                </div>

                {/* Logical Explanation for Users */}
                <div className="explanation" style={{ color: '#fff', padding: '20px', borderRadius: '10px', marginBottom: '20px', background: 'rgba(0, 0, 0, 0.7)' }}>
                    <h2 style={{ color: '#ff6347' }}>Why Use Our Systems?</h2>
                    <p>Our NFT collection and GAMEFI system offer unique opportunities to earn crypto rewards through active and passive participation. Whether you are an experienced gamer or new to the blockchain world, our systems are designed to provide a seamless and rewarding experience. Here are some reasons why you should use our systems:</p>
                    <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                        <li><strong>Earn Rewards:</strong> Participate in missions and earn crypto rewards. Our systems offer both active and passive earning opportunities.</li>
                        <li><strong>Advanced Technology:</strong> We use cutting-edge technologies such as CSS, JS, HTML, REACT, CANVAS, and the Delegated Proof of Stake (DPoS) algorithm to ensure a secure and efficient platform.</li>
                        <li><strong>User-Centric Design:</strong> Our products are continuously improved based on user feedback to ensure the highest value and satisfaction.</li>
                        <li><strong>Community and Support:</strong> Join a community of like-minded individuals and receive personalized support through our various channels.</li>
                    </ul>
                </div>

                {/* Accordion for Detailed Information */}
                <div className="accordion">
                    <div className="accordion-item" style={{ marginBottom: '10px' }}>
                        <button className="accordion-button" style={{ display: 'flex', alignItems: 'center', border: 'none', outline: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '15px', fontSize: '18px', transition: 'background-color 0.3s', background: 'rgba(0, 0, 0, 0.7)' }}>
                            <img src="https://i.imgur.com/k9Hs8jo.png" alt="Mission Icon" className="icon-image" style={{ width: '24px', height: '24px', marginRight: '10px' }} /> Our Mission <span className="indicator" style={{ marginLeft: 'auto' }}>></span>
                        </button>
                        <div className="accordion-content" style={{ padding: '0px 15px', display: 'none', overflow: 'hidden', background: 'rgba(0, 0, 0, 0.7)' }}>
                            <p>Our mission is to enable users to earn rewards through our NFT collection and GAMEFI system. We offer crypto rewards for both active and passive participation, creating a self-sustaining system.</p>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ marginBottom: '10px' }}>
                        <button className="accordion-button" style={{ display: 'flex', alignItems: 'center', border: 'none', outline: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '15px', fontSize: '18px', transition: 'background-color 0.3s', background: 'rgba(0, 0, 0, 0.7)' }}>
                            <img src="https://i.imgur.com/7sfxxYk.png" alt="Values Icon" className="icon-image" style={{ width: '24px', height: '24px', marginRight: '10px' }} /> Our Values <span className="indicator" style={{ marginLeft: 'auto' }}>></span>
                        </button>
                        <div className="accordion-content" style={{ padding: '0px 15px', display: 'none', overflow: 'hidden', background: 'rgba(0, 0, 0, 0.7)' }}>
                            <h3 style={{ marginTop: '15px', color: '#ff6347' }}>1. Added Value for Users</h3>
                            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                                <li>Continuous Product Improvement</li>
                                <li>Personalized Attention</li>
                                <li>Loyalty Programs</li>
                                <li>Incentives for Promotion</li>
                            </ul>
                            <h3 style={{ marginTop: '15px', color: '#ff6347' }}>2. Revenue Optimization</h3>
                            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                                <li>Freemium Models</li>
                                <li>Volume Discounts</li>
                                <li>Revenue Diversification</li>
                                <li>Collaborations and Alliances</li>
                            </ul>
                            <h3 style={{ marginTop: '15px', color: '#ff6347' }}>3. Operational Efficiency</h3>
                            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                                <li>Process Automation</li>
                                <li>Data Analysis</li>
                                <li>Cost Reduction</li>
                                <li>Supplier Negotiations</li>
                            </ul>
                            <h3 style={{ marginTop: '15px', color: '#ff6347' }}>4. Empowerment and Transparency</h3>
                            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                                <li>User Empowerment</li>
                                <li>User Participation</li>
                                <li>Operational Transparency</li>
                                <li>Social Responsibility</li>
                            </ul>
                        </div>
                    </div>
                    <div className="accordion-item" style={{ marginBottom: '10px' }}>
                        <button className="accordion-button" style={{ display: 'flex', alignItems: 'center', border: 'none', outline: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '15px', fontSize: '18px', transition: 'background-color 0.3s', background: 'rgba(0, 0, 0, 0.7)' }}>
                            <img src="https://i.imgur.com/J1MUV35.jpg" alt="Technology Icon" className="icon-image" style={{ width: '24px', height: '24px', marginRight: '10px' }} /> What Technology Do We Use? <span className="indicator" style={{ marginLeft: 'auto' }}>></span>
                        </button>
                        <div className="accordion-content" style={{ padding: '0px 15px', display: 'none', overflow: 'hidden', background: 'rgba(0, 0, 0, 0.7)' }}>
                            <p>We use CSS, JS, HTML, REACT, and CANVAS. Our blockchain technology employs the Delegated Proof of Stake (DPoS) algorithm, allowing users to stake their WAXP tokens to validate transactions and earn rewards.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="profit-tracker">
                <h2>Profit Tracker</h2>
                <div className="section-images">
                    <div>
                        <img src="https://i.imgur.com/6IHmMft.gif" alt="Profit Tracker Free" />
                        <p>Profit Tracker Free</p>
                    </div>
                    <div>
                        <img src="https://i.imgur.com/hdVbWqI.gif" alt="Profit Tracker Normal" />
                        <p>Profit Tracker Normal (PRICE: 50 WAX)</p>
                    </div>
                    <div>
                        <img src="https://i.imgur.com/gQ1rFBC.gif" alt="Profit Tracker Premium" />
                        <p>Profit Tracker Premium (PRICE: 75 WAX)</p>
                    </div>
                </div>
                <button className="play-now-button" onClick={() => window.location.href='https://stickershub.web.app/'}>Play Now</button>
                <div className="profit-tracker-info">
                    <h3>Profit Tracker Versions</h3>
                    <p><strong>Free Version:</strong> Offers users a chance to get to know the platform and earn rewards, though they are limited compared to other versions. The Free player has access to three types of missions:</p>
                    <ul>
                        <li>Moon</li>
                        <li>Mars</li>
                        <li>Jupiter</li>
                    </ul>
                    <p><strong>Normal Profit Tracker:</strong> For 50 WAX, users have access to ALL missions with no restrictions.</p>
                    <p><strong>Premium Profit Tracker:</strong> For 75 WAX, users have access to all missions and can complete them twice as fast. Additionally, there are more benefits:</p>
                    <ul>
                        <li>Automatic reward system for holders on the 1st of each month.</li>
                        <li>Profit sharing from commission earnings on Profit Tracker sales, distributed among holders.</li>
                        <li>Normal holders receive 5% of the royalty pool generated by Profit Tracker NFTs.</li>
                        <li>Premium holders receive 10% of the royalty pool generated by Profit Tracker NFTs.</li>
                        <li>Ability to craft rewards to enhance and improve inventory items.</li>
                        <li>Equip your Profit Tracker with weapons, armor, and equipment to influence the game in your favor.</li>
                    </ul>
                    <h3>Rewards and Equipment</h3>
                    <p>In Profit Tracker, you can earn rewards by completing missions. These rewards are:</p>
                    <ul>
                        <li>Critters <img src="https://i.imgur.com/yRdIaLi.png" alt="Critters" className="image-icon" /></li>
                        <li>Ores <img src="https://i.imgur.com/p6MzfDS.png" alt="Ores" className="image-icon" /></li>
                        <li>Elemental Cubes <img src="https://i.imgur.com/qwB77Mf.png" alt="Elemental Cubes" className="image-icon" /></li>
                    </ul>
                    <p>These rewards go directly to your inventory:</p>
                    <ul>
                        <li>Critters contain Critter Parts <img src="https://i.imgur.com/MPzALQM.png" alt="Critter Parts" className="image-icon" /></li>
                        <li>Ores contain Gems <img src="https://i.imgur.com/YeUXfoX.png" alt="Gems" className="image-icon" /></li>
                        <li>Elemental Cubes are objects used in various systems and crafting <img src="https://i.imgur.com/qwB77Mf.png" alt="Elemental Cubes" className="image-icon" /></li>
                    </ul>
                    <p>To defeat a Critter, you need a weapon <img src="https://i.imgur.com/OJcl8uB.png" alt="Weapon" className="image-icon" />. To mine an Ore, you need a pickaxe <img src="https://i.imgur.com/ZzundN2.png" alt="Pickaxe" className="image-icon" />. We provide a trial weapon and pickaxe with one basic use to try out. After using the trial weapon and pickaxe, you will be shown how to obtain more.</p>
                    <p>If you choose not to obtain a weapon or pickaxe, your rewards will continue to accumulate in the inventory, but you will not be able to kill Critters or collect Gems.</p>
                    <p>There are different classes of equipment, weapons, and tools, each with varying effects based on rarity:</p>
                    <ul>
                        <li>Basic</li>
                        <li>Rare</li>
                        <li>Epic</li>
                        <li>Legendary</li>
                    </ul>
                    <p>Rewards are classified as follows:</p>
                    <ul>
                        <li>Critters <img src="https://i.imgur.com/yRdIaLi.png" alt="Critters" className="image-icon" /></li>
                        <li>Ores <img src="https://i.imgur.com/p6MzfDS.png" alt="Ores" className="image-icon" /></li>
                        <li>Elemental Cubes <img src="https://i.imgur.com/qwB77Mf.png" alt="Elemental Cubes" className="image-icon" /></li>
                        <li>Critter Parts <img src="https://i.imgur.com/MPzALQM.png" alt="Critter Parts" className="image-icon" /></li>
                        <li>Gems <img src="https://i.imgur.com/YeUXfoX.png" alt="Gems" className="image-icon" /></li>
                    </ul>
                    <h3>Types of Critters</h3>
                    <p>There are 3 types of Critters:</p>
                    <ul>
                        <li><strong>Normal Critters:</strong> These range from Basic to Rare.</li>
                        <li><strong>Elevated Critters:</strong> These range from Epic to Legendary.</li>
                        <li><strong>Pizza Critters:</strong> These are classified as Epic, and their Critter Parts are also Epic. <img src="https://i.imgur.com/rCj3fHp.png" alt="Pizza Critters" className="image-icon" /></li>
                    </ul>
                    <h3>Trading with NPCs</h3>
                    <p>Critter Parts can be traded with the NPC Usékar the Druid <img src="https://i.imgur.com/YM244Fr.gif" alt="Usékar the Druid" className="image-icon" />.</p>
                    <p>Gems can be traded with the NPC Frederic the Jeweler <img src="https://i.imgur.com/JfsumFl.gif" alt="Frederic the Jeweler" className="image-icon" />.</p>
                    <p>Pizza Critter Parts can be traded with Giovanni il Pizzaiolo <img src="https://i.imgur.com/4U5ayMW.gif" alt="Giovanni il Pizzaiolo" className="image-icon" />.</p>
                    <h3>Economy</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>NPC</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>SHCoins <img src="https://i.imgur.com/5MbUxQA.png" alt="SHCoins" className="image-icon" /></td>
                                <td>In-game currency earned through missions</td>
                                <td>Usékar, Giovanni, Frederic</td>
                            </tr>
                            <tr>
                                <td>Critter Parts <img src="https://i.imgur.com/MPzALQM.png" alt="Critter Parts" className="image-icon" /></td>
                                <td>Used to buy Critter Parts</td>
                                <td>Usékar the Druid <img src="https://i.imgur.com/YM244Fr.gif" alt="Usékar the Druid" className="image-icon" /></td>
                            </tr>
                            <tr>
                                <td>Pizza Critter Parts <img src="https://i.imgur.com/8Vwafaa.png" alt="Pizza Critter Parts" className="image-icon" /></td>
                                <td>Used to buy Pizza Critter Parts</td>
                                <td>Giovanni il Pizzaiolo <img src="https://i.imgur.com/4U5ayMW.gif" alt="Giovanni il Pizzaiolo" className="image-icon" /></td>
                            </tr>
                            <tr>
                                <td>Gems <img src="https://i.imgur.com/YeUXfoX.png" alt="Gems" className="image-icon" /></td>
                                <td>Used to buy Gems</td>
                                <td>Frederic the Jeweler <img src="https://i.imgur.com/JfsumFl.gif" alt="Frederic the Jeweler" className="image-icon" /></td>
                            </tr>
                            <tr>
                                <td>SHTOKENs <img src="https://i.imgur.com/GCqKFr5.png" alt="SHTOKENs" className="image-icon" /></td>
                                <td>NFTs designed to represent our future cryptocurrency</td>
                                <td>Frederic the Jeweler <img src="https://i.imgur.com/JfsumFl.gif" alt="Frederic the Jeweler" className="image-icon" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <p>SHTOKENs are NFTs designed to represent our future cryptocurrency. There are a limited number of 1,000 tokens, which do not burn and are always in circulation. The in-game floor price for each token is 30,000 SHCoins.</p>
                    <p>In the future, SHTOKENs can be exchanged (burned) for our own cryptocurrency. The amount of cryptocurrency received will be based on the user's total number of tokens and the base floor price of the tokens at the time of conversion.</p>
                    <p><strong>Example Calculation with 1 SHTOKEN:</strong></p>
                    <p>Imagine in a hypothetical scenario that the SHTOKEN has a floor price of $1. Suppose our own cryptocurrency has a value of $0.000001 at the time of conversion.</p>
                    <p>When exchanging 1 SHTOKEN valued at $1 for our cryptocurrency, it would function as if you were buying $1 worth of our cryptocurrency at $0.000001 per unit. The exchange would give you 1,000,000 units of our cryptocurrency.</p>
                    <p>Therefore, the conversion would deliver a total of 1,000,000 units.</p>
                    <p>If you have 10 tokens, it would be as if you were buying $10 worth of our cryptocurrency at $0.000001 per unit. The exchange would give you 10,000,000 units of our cryptocurrency.</p>
                    <h3>SHCoins Rewards per Mission</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Mission</th>
                                <th>SHCoins Reward Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Moon</td>
                                <td>0 to 1</td>
                            </tr>
                            <tr>
                                <td>Mars</td>
                                <td>1 to 2</td>
                            </tr>
                            <tr>
                                <td>Jupiter</td>
                                <td>2 to 4</td>
                            </tr>
                            <tr>
                                <td>Alpha Centauri</td>
                                <td>4 to 8</td>
                            </tr>
                            <tr>
                                <td>Andromeda Galaxy</td>
                                <td>8 to 16</td>
                            </tr>
                            <tr>
                                <td>Deep Space</td>
                                <td>16 to 32</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="nft-info">
                    <h3>Tradeable NFTs</h3>
                    <p>Our NFTs are tradeable in both the secondary market and in-game. They can also be traded with NPCs, although not all NFTs are eligible for this feature.</p>
                </div>
                <div className="rarity-info">
                    <h3>Rarities and Equipment</h3>
                    <p>We have different classes of rarities and equipment such as weapons and armor that are useful across all our systems in various ways.</p>
                </div>
                <h2>Drop Rate Summary by Rarity and Mission</h2>
                <p>Each mission contains multiple items in each rarity category. The percentages shown are the drop rates for each specific item within those categories.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Rarity</th>
                            <th>Moon</th>
                            <th>Mars</th>
                            <th>Jupiter</th>
                            <th>Alpha Centauri</th>
                            <th>Andromeda Galaxy</th>
                            <th>Deep Space</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Basic (15 items)</td>
                            <td>Each item: 5%</td>
                            <td>Each item: 7.5%</td>
                            <td>Each item: 11.3%</td>
                            <td>Each item: 16.9%</td>
                            <td>Each item: 25.3%</td>
                            <td>Each item: 38.0%</td>
                        </tr>
                        <tr>
                            <td>Rare (18 items)</td>
                            <td>Not applicable</td>
                            <td>Not applicable</td>
                            <td>Not applicable</td>
                            <td>Each item: 3.3%</td>
                            <td>Each item: 5.0%</td>
                            <td>Each item: 7.5%</td>
                        </tr>
                        <tr>
                            <td>Epic (16 items)</td>
                            <td>Not applicable</td>
                            <td>Not applicable</td>
                            <td>Not applicable</td>
                            <td>Not applicable</td>
                            <td>Each item: 2.2%</td>
                            <td>Each item: 3.3%</td>
                        </tr>
                        <tr>
                            <td>Legendary (8 items)</td>
                            <td>Not applicable</td>
                            <td>Not applicable</td>
                            <td>Not applicable</td>
                            <td>Not applicable</td>
                            <td>Not applicable</td>
                            <td>Each item: 0.3%</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="divine">
                <h2>Divine</h2>
                <img src="https://i.imgur.com/vANNxIp.jpeg" alt="Quokka astronauta 'Coming Soon'" style={{ width: '500px' }} />
            </section>

            <section id="minigames">
                <h2>Minigames</h2>
                <img src="https://i.imgur.com/vANNxIp.jpeg" alt="Quokka astronauta 'Coming Soon'" style={{ width: '500px' }} />
            </section>

            <section id="wiki">
                <h2>SHWiki</h2>
                <img src="https://i.imgur.com/vANNxIp.jpeg" alt="Quokka astronauta 'Coming Soon'" style={{ width: '500px' }} />
            </section>

            <section id="contact" style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', color: '#fff' }}>
                <h2 style={{ color: '#ff6347', textAlign: 'center' }}>Contact</h2>
                <div style={{ textAlign: 'center' }}>
                    <img src="https://i.imgur.com/9vXiEKI.jpeg" alt="Quokka Oficinista" style={{ width: '330px', marginTop: '10px', borderRadius: '10px' }} />
                </div>

                <div className="contact-section" style={{ marginTop: '20px' }}>
                    <h3 style={{ color: '#ff6347' }}>Apply collection for Profit Tracker</h3>
                    <p>If you are interested in applying your collection for our Profit Tracker system, please fill out this form. (Coming Soon)</p>
                    <div style={{ textAlign: 'center' }}>
                        <a href="#" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#ff6347', color: '#fff', borderRadius: '5px', textDecoration: 'none', marginTop: '10px' }}>Fill Form</a>
                    </div>
                </div>

                <div className="contact-section" style={{ marginTop: '20px' }}>
                    <h3 style={{ color: '#ff6347' }}>Apply collection for Divine</h3>
                    <p>If you are interested in applying your collection for our Divine system, please fill out this form. (Coming Soon)</p>
                    <div style={{ textAlign: 'center' }}>
                        <a href="https://example.com/form" target="_blank" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#ff6347', color: '#fff', borderRadius: '5px', textDecoration: 'none', marginTop: '10px' }}>Fill Form</a>
                    </div>
                </div>

                <div className="contact-section" style={{ marginTop: '20px' }}>
                    <h3 style={{ color: '#ff6347' }}>Artistic Collaborations</h3>
                    <p>We welcome artistic collaborations. If you are an artist and would like to collaborate with us, please fill out this form.</p>
                    <div style={{ textAlign: 'center' }}>
                        <a href="https://example.com/form" target="_blank" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#ff6347', color: '#fff', borderRadius: '5px', textDecoration: 'none', marginTop: '10px' }}>Fill Form</a>
                    </div>
                </div>

                <div className="contact-section" style={{ marginTop: '20px' }}>
                    <h3 style={{ color: '#ff6347' }}>Work with Us</h3>
                    <p>We are always looking for talented individuals to join our team. If you are interested in working with us, please fill out this form. (Coming Soon)</p>
                    <div style={{ textAlign: 'center' }}>
                        <a href="#" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#ff6347', color: '#fff', borderRadius: '5px', textDecoration: 'none', marginTop: '10px' }}>Fill Form</a>
                    </div>
                </div>

                <div className="contact-section" style={{ marginTop: '20px' }}>
                    <h3 style={{ color: '#ff6347' }}>Support</h3>
                    <p>We offer personal assistance on Discord with live chat. Stay updated with our information and events on both Twitter and Discord.</p>
                    <p>For any support inquiries, please join our Discord for personal assistance and live chats, or contact us via email.</p>
                </div>

                <div className="contact-icons" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <a href="mailto:stickershuboficial@gmail.com" style={{ margin: '0 10px', color: '#ff6347', fontSize: '24px' }}><i className="fas fa-envelope"></i></a>
                    <a href="https://discord.com/invite/NeUgxfuSZQ" target="_blank" style={{ margin: '0 10px', color: '#7289da', fontSize: '24px' }}><i className="fab fa-discord"></i></a>
                    <a href="https://x.com/StickersHubWAX" target="_blank" style={{ margin: '0 10px', color: '#1da1f2', fontSize: '24px' }}><i className="fab fa-twitter"></i></a>
                </div>
            </section>

            <section id="dashboard">
                <h2>Dashboard</h2>
                <img src="https://i.imgur.com/vANNxIp.jpeg" alt="Quokka astronauta 'Coming Soon'" style={{ width: '500px' }} />
            </section>

            {/* Create Account Section */}
            <section id="create-account">
                <h2>Create Account</h2>
                <p>Aqui se mostrara una pequeña introduccion sobre la pagina Create Account.</p>
                <img src="https://i.imgur.com/PfDdwAl.jpeg" alt="quokka alistandose'" style={{ width: '330px' }} />
                <p>Aqui se le mostrara al usuario como registrarse en anchor y wax cloud wallet.</p>
            </section>
        </>
    );
};

export default Home;


