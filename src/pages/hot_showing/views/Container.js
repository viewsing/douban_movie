import React, {Component} from 'react';
import InTheater from './InTheater.js';
import ComingSoon from './ComingSoon.js';
import { connect } from 'react-redux';
import { changeTabTo } from '../actions.js';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

/**
 * 功能是控制tab切换，第一次切换至comingsoon，它才开始加载数据
 */
class Container extends Component {
    constructor(props) {
        super(props);
        this.firstToComing = true;
        this.Ref = this.Ref.bind(this);
        this.tabToComingSoon = this.tabToComingSoon.bind(this);
        this.tabToHotShowing = this.tabToHotShowing.bind(this);
    }
    componentDidMount(){
        this.mySwiper = new Swiper('.swiper-container', {
            initialSlide: this.props.activeIndex,
            on:{   
                slideChange: () => {
                    this.mySwiper && this.props.changeTabTo(this.mySwiper.activeIndex);
                    window.scrollTo(0,0);
                },
                slideNextTransitionEnd: () => {
                    if (this.firstToComing) {
                        this.ComingSoon.fetchData();
                        this.firstToComing = false;
                    }
                }
            }
        });
    }
    Ref(ref) {
        //ComingSoon实例，在swipe回掉函数里控制，在第一次进入时加载数据
        this.ComingSoon = ref;
    }
    tabToHotShowing() {
        this.mySwiper.slidePrev();
    }
    tabToComingSoon() {
        this.mySwiper.slideNext();
    }
    render(){
        const {activeIndex} = this.props;
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
                            <ComingSoon Ref = {this.Ref} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state, ownProps) {
    return {
        activeIndex: state.hotShowing.activeIndex
    }
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        changeTabTo: (index) => {
            dispatch(changeTabTo(index)) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
