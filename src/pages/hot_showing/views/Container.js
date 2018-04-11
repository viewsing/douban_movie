import React, {Component} from 'react';
import InTheater from './InTheater.js';
import Coming from './Coming.js';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
        this.tabToComingSoon = this.tabToComingSoon.bind(this);
        this.tabToHotShowing = this.tabToHotShowing.bind(this);
    }
    componentDidMount(){
        this.mySwiper = new Swiper('.swiper-container', {
            on:{   
                slideChange: () => {
                    this.setState({ activeIndex: this.mySwiper.activeIndex });
                    window.scrollTo(0,0);
                }
            }
        });
    }
    tabToHotShowing() {
        this.mySwiper.slidePrev();
    }
    tabToComingSoon() {
        this.mySwiper.slideNext();
    }
    render(){
        const activeIndex = this.state.activeIndex;
        return (
            <div id="hotShowing-container">
                <div className="container-heading">
                    <div className={ (activeIndex === 0 ? 'active ' : '') + 'heading-item inTheater-heading' }
                         onClick={this.tabToHotShowing}>正在热映</div>
                    <div className={ (activeIndex === 1 ? 'active ' : '') + 'heading-item comingSoon-heading' }
                        onClick={this.tabToComingSoon}>即将上映</div>
                </div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <InTheater/>
                        </div>
                        <div className="swiper-slide">
                            <Coming/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Container;
