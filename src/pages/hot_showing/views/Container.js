import React, {Component} from 'react';
import InTheater from './InTheater.js';
import ComingSoon from './ComingSoon.js';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
        this.firstToComing = true;
        this.tabToComingSoon = this.tabToComingSoon.bind(this);
        this.tabToHotShowing = this.tabToHotShowing.bind(this);
    }
    componentDidMount(){
        this.mySwiper = new Swiper('.swiper-container', {
            on:{   
                slideChange: () => {
                    this.setState({ activeIndex: this.mySwiper.activeIndex });
                    if (this.mySwiper.activeIndex === 0) {
                        this.firstToComing = false;
                    }
                    window.scrollTo(0,0);
                },
                slideNextTransitionEnd: () => {
                    console.log(1);
                }
            }
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.activeIndex !== nextState.activeIndex;
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
                            <InTheater />
                        </div>
                        <div className="swiper-slide">
                            <ComingSoon isActive={activeIndex === 1 ? true : false} firstToComing={this.firstToComing} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Container;
