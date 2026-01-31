import Home from "../pages/Home";
import downIcon from "../assets/down-arrow.png";

function Landing() {
    return (
        <>
            <div className="landing-effect">
                    <img src="https://megbittonproductions.com/cdn/shop/files/AssetsWebsiteGraphic1_9cda4749-a27c-42df-b000-e6b629c33880.png?v=1716428580"/>
            </div>
            <div className="landing">
                <span className="title">creatorverse</span>

                <div className="scroll-to-creators">
                    <a href="/#creators">CREATORS</a>
                    <img src={downIcon} className="down-icon"/>
                </div>
            </div>  
        </>
    )
}

export default Landing;