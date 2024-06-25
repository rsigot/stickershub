import React from 'react';
import './Css/Home.css';
import Footer from './Js/Footer';

const Home = () => {
    const showSection = (id) => {
        document.querySelectorAll('section').forEach((section) => {
            section.classList.remove('active');
            //section.style.opacity = '0';
        });
        const activeSection = document.getElementById(id);
        activeSection.classList.add('active');
        setTimeout(() => {
            //activeSection.style.opacity = '1';
        }, 50);
    };

    return (
        <div>
            <header>
                <img src="https://i.imgur.com/H8MDrgS.gif" alt="Company Logo" />
                <h1>Welcome Humans!</h1>
            

            <nav>
                <a href="#" onClick={() => showSection('introduction')}>Latest News</a>
                <a href="#" onClick={() => showSection('login')}>My Account</a>
                <a href="#" onClick={() => showSection('profittracker')}>Profit Tracker</a>
                <a href="#" onClick={() => showSection('beta-access')}>Beta Access</a>
                <a href="#" onClick={() => showSection('how-to-play')}>How to Play</a>
                <a href="#" onClick={() => showSection('wiki')}>Wiki</a>
                <a href="#" onClick={() => showSection('work-with-us')}>Work with Us</a>
            </nav>
            </header>

            <section id="introduction" className="section active">
                <div className="container">
                    <h2>BETA: PHASE 1</h2>
                    <p>‍</p>
                    <p>In Phase 1 of the Beta Version, the following items will be available:</p>
                    <p>‍</p>
                    <ul>
                        <li>Ores</li>
                        <li>Gems</li>
                        <li>Critters</li>
                        <li>Critter Parts</li>
                        <li>Pickaxes</li>
                    </ul>
                    <p>‍</p>
                    <p>Best Regards,</p>
                    <p>CEO of StickersHUB1</p>
                    <p>June 22, 2024 - 14:44 PM</p>
                </div>

                <div className="container">
                    <h2>Limited Early Access (Beta Tester)</h2>
                    <p>‍</p>
                    <p>We have launched the limited early access version (Beta Tester) for a price of 5 WAX.</p>
                    <p>‍</p>
                    <ul>
                        <li>Beta Testers have early access to the game's features for bug testing and bug searching.</li>
                        <li>Beta Testers will be rewarded for finding and reporting bugs and errors to the team.</li>
                        <li>The game for Beta Testers is 100% real and functional, and rewards are delivered just as they would be in the ALPHA versions.</li>
                    </ul>
                    <p>‍</p>
                    <p>Best Regards,</p>
                    <p>CEO of StickersHUB1</p>
                    <p>June 22, 2024 - 14:39 PM</p>
                </div>
                <Footer />
            </section>
            <section id="login" className="section">
                <div className="container">
                    <h2>Login (COMING SOON)</h2>
                    <p>To view your account progress, please log in. If you do not have an Anchor or Wax Cloud Wallet account, please create one.</p>
                    <button className="btn">Login</button>
                </div>
                <div className="container">
                    <h3>How to Create an Anchor Wallet (Oficial Video)</h3>
                    <p>If you are new to Anchor Wallet, follow this guide to create your wallet:</p>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/93n9ogWijn0" title="Anchor Wallet Guide" frameborder="0" allowfullscreen></iframe>
                    <a href="https://play.google.com/store/apps/details?id=com.greymass.anchor&hl=es_419&pli=1" target="_blank" className="btn">Download Anchor Wallet from Play Store</a>
                </div>
                <div className="container">
                    <h3>How to Create a Wax Cloud Wallet</h3>
                    <p>If you are new to Wax Cloud Wallet, follow this guide to create your wallet:</p>
                    <a href="https://www.mycloudwallet.com/register" target="_blank" className="btn">Create Wax Cloud Wallet</a>
                </div>
                <Footer />

            </section>

            <section id="beta-access" className="section">
                <h2>Beta Access</h2>
                <p>Be among the first to experience the BETA version of Profit Tracker by purchasing a BETA Tester NFT.</p>
                <p>Here’s why it’s an incredible opportunity:</p>

                <div className="container">
                    <h3>Access the Mission Menu</h3>
                    <p>Once you have logged in, you will be redirected to the main game menu. From here, select the "Mission Spacecraft" option to access the list of available missions. Only players who have a BetaTester NFT in their wallet can access this menu.</p>
                </div>

                <div className="container">
                    <h3>Available Missions</h3>
                    <p>You will see a variety of missions with different durations and rewards. The initially available missions are:</p>
                    <ul>
                        <li>Moon Mission: Duration of 45 minutes.</li>
                        <li>Mars Mission: Duration of 90 minutes.</li>
                        <li>Jupiter Mission: Duration of 3 hours.</li>
                        <li>Longer missions, such as Alpha Centauri, Andromeda Galaxy, and Deep Space, will be available in the future.</li>
                    </ul>
                </div>

                <div className="container">
                    <h3>Button Activation Conditions</h3>
                    <ul>
                        <li>The buttons for the Moon, Mars, and Jupiter missions will be enabled if you do not have any mission in progress.</li>
                        <li>If you already have a mission in progress, only the button for that mission will be enabled so you can resume the mission and claim your rewards.</li>
                    </ul>
                </div>

                <div className="container">
                    <h3>Purchase Your BETA NFT</h3>
                    <ul>
                        <li>100 BETA NFTs available, each at a price of 5 WAX.</li>
                        <li>Early access to the BETA version of Profit Tracker.</li>
                        <li>Exclusive features and participation in our tester community.</li>
                    </ul>
                </div>

                <div className="container">
                    <h3>Raffle Conditions (Valid until all beta testers are sold)</h3>
                    <ul>
                        <li>Goal: If we sell more than 50 BETA NFTs, we will hold a special raffle.</li>
                        <li>Raffle Prize: An exclusive NFT backed with 100 WAX. 💎</li>
                        <li>If we do not reach 50 sales, the raffle will not take place, so ensure your participation and help the community reach the goal!</li>
                    </ul>
                </div>

                <div className="container">
                    <h3>Incentives for Early Adopters</h3>
                    <ul>
                        <li>Participation in Future Developments: The first 50 buyers will receive priority access to future updates and beta versions of other products.</li>
                        <li>Exclusive Discounts: During the first phase, you will receive a 20% discount on future NFT and product purchases from Profit Tracker.</li>
                        <li>VIP Role on Discord: Get a VIP role in our Discord server, giving you access to exclusive channels and direct communication with the development team.</li>
                        <li>Exclusive Events: Access to exclusive online events where you can interact with the team and other early adopters.</li>
                        <li>No Penalty for Using and Discovering Bugs: Explore freely and without worries. There will be no penalties for finding bugs during the beta phase.</li>
                        <li>Reward in SHCoins: Report any bugs you find and be rewarded with SHCoins, our internal currency!</li>
                        <li>Reward at the End of Phase 1: Early adopter beta testers who own this NFT will be rewarded with 1 SHTOKEN, with an in-game value of 30,000 SHCoins.</li>
                        <li>Benefits of Having a Beta Tester Version: When a new beta tester version of another system is released, you can exchange your obsolete beta tester version for this new version plus 1 WAX, without having to purchase it for 5 WAX.</li>
                    </ul>
                </div>

                <div className="container">
                    <h3>Referral Rewards (Coming Soon)</h3>
                    <ul>
                        <li>The invitation count resets for each claimed reward and is not cumulative.</li>
                        <li>You can invite the same wallet again without any issues.</li>
                        <li>For 1 friend who buys thanks to you: 1000 SHCoins</li>
                        <li>For 2 friends who buy thanks to you: 1500 SHCoins</li>
                        <li>For 3 friends who buy thanks to you: 2000 SHCoins</li>
                        <li>For 4 friends who buy thanks to you: 2500 SHCoins</li>
                        <li>For 5 friends who buy thanks to you: 5000 SHCoins</li>
                        <li>For 6 friends who buy thanks to you: 5500 SHCoins</li>
                        <li>For 7 friends who buy thanks to you: 6000 SHCoins</li>
                        <li>For 8 friends who buy thanks to you: 6500 SHCoins</li>
                        <li>For 9 friends who buy thanks to you: 7000 SHCoins</li>
                        <li>For 10 friends who buy thanks to you: 10000 SHCoins</li>
                    </ul>
                </div>

                <div className="container">
                    <p>Don't miss this unique opportunity to be an early adopter and be part of our community from the beginning. Secure your BETA NFT and help us reach the goal to unlock the amazing raffle and all these benefits.</p>
                </div>

                <div className="img-container">
                    <img src="https://i.imgur.com/96B7YZ8.jpg" alt="Beta Access" />
                    <a href="https://neftyblocks.com/collection/stickershub1/drops/220267" className="btn">Buy Beta Access</a>
                </div>

                <Footer />

            </section>



            <section id="how-to-play" className="section">
                <h2>How to Play (Beta Users Only)</h2>
                <p>‍</p>
                <ol>
                    <li><strong>Select a Mission:</strong> Click on the "Launch Mission 🚀" button for the mission you want to start.</li>
                    <p>‍</p>
                    <li><strong>Start Mission:</strong> Once the mission is selected, click on "Start Mission Now!" to begin. The mission timer will start, and you can see the progress in real-time.</li>
                    <p>‍</p>
                    <li><strong>Mission Progress:</strong> During the mission, you will see a timer indicating the remaining time. You can engage in other activities while waiting for the mission to complete.</li>
                    <p>‍</p>
                    <li><strong>Mission Completion:</strong> Once the timer reaches zero, the mission will be marked as complete, and you will be able to claim your rewards.</li>
                    <p>‍</p>
                    <li><strong>Claim Rewards:</strong> Click on the "CLAIM REWARDS NOW!" button to add the rewards to your inventory. The NFTs will be minted directly to your wax wallet, while SHCoins will be transferred to your in-game wallet.</li>
                </ol>
                <div className="horizontal-container">
                    <div className="img-container">
                        <img src="https://i.imgur.com/Rk6ofII.jpg" alt="Profit Tracker" />
                        <a href="https://neftyblocks.com/collection/stickershub1/drops/220454" className="btn">Buy Normal</a>
                        <p> 50 WAX </p>
                    </div>
                    <div className="img-container">
                        <img src="https://i.imgur.com/9TB3uqQ.jpg" alt="Profit Tracker Premium" />
                        <a href="https://neftyblocks.com/collection/stickershub1/drops/220454" className="btn">Buy Premium</a>
                        <p> 100 WAX </p>
                    </div>
                </div>
                <Footer />

            </section>

            <section id="wiki" className="section">
                <h2>Wiki (Coming Soon)</h2>
                <p>‍</p>
                <p>This section will be ready soon.</p>
                <div className="img-container">
                    <img src="https://i.imgur.com/BIDiczU.gif" alt="Profit Tracker Logo" />
                </div>
                <Footer />

            </section>

            <section id="work-with-us" className="section">
                <h2>Work with Us (Coming Soon)</h2>
                <p>‍</p>
                <p>This section will be ready soon.</p>
                <div className="img-container">
                    <img src="https://i.imgur.com/BIDiczU.gif" alt="Profit Tracker Logo" />
                </div>
                <Footer />

            </section>

            <section id="profittracker" className="section">
                <h2>Profit Tracker (BETA)</h2>
                <p>‍</p>
                <p>Hello Human! Welcome to Profit Tracker!</p>
                <div className="container center">
                    <div className="img-container">
                        <img src="https://i.imgur.com/BIDiczU.gif" alt="Profit Tracker Logo" />
                    </div>
                    <p> </p>
                    <p>Explore the Beta version and help us improve!</p>
                    <a href="/ProfitTracker" target="_blank" className="btn">Play Profit Tracker</a>
                </div>
                <div className="container orange">
                    <p>Don't have Beta access yet? Get your <a href="#" onclick="showSection('beta-access')">Beta Access here!</a>
                        <p>Learn more about Profit Tracker in the <a href="#" onclick="showSection('wiki')">Wiki!</a>
                        </p>
                        <Footer />
                    </p>
                </div>
            </section>

        </div>
    );
};

export default Home;
