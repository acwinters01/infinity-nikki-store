import React, { useEffect } from "react";
import gsap  from "gsap";
import "../../styles/featuredOutfits.css"

const FeaturedOutfits: React.FC = () => {

    const images = [".wishfulA1", ".wishfulA2", ".flutterS1", ".flutterS2"];

    useEffect(() => {
        let tl = gsap.timeline({ repeat: -1, repeatDelay: 0});

        // Making sure to have the first images visible when app is loaded
        tl.set(images[0], { opacity: 1 })
            .to({}, { duration: 10 });

        // Start the animation from the second image
        for ( let i = 1; i < images.length; i++ ) {
            tl.to(images[i], { opacity: 1, duration: 5})
              .to(images[i-1], { opacity: 0, duration: 5 }, "<")
              .to({}, { duration: 10 })
        }

        // Loop back to the beginning
        tl.to(images[0], { opacity: 1, duration: 5 })
        .to(images[images.length - 1], { opacity: 0, duration: 5 }, "<")
        .to({}, { duration: 10 })
           
    }, [])

    const handleOnClick = () => {
    }
    return (
        <div className='featured-outfits-container'>
            <div className="featured-outfits">
                <img className="wishfulA1" id="featured-image" src='./assets/featuredBanners/featuredOutfit-WishfulAurosa1.png'/>
                <img className="wishfulA2" id="featured-image" src='./assets/featuredBanners/featuredOutfit-WishfulAurosa2.png'/>
                <img className="flutterS1" id="featured-image" src='./assets/featuredBanners/featuredOutfit-FlutterStorm1.png'/>
                <img className="flutterS2" id="featured-image" src='./assets/featuredBanners/featuredOutfit-FlutterStorm2.png'/>
            </div>  
        </div>
    );
};

export default FeaturedOutfits;
