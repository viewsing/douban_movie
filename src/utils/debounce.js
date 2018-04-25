//函数防抖
export default (callback, delay) => {
    let timer = null;
    return function(event) {
        let context = this, args = arguments;
        event.persist && event.persist(); //兼容react的合成事件不能异步访问事件的问题
        clearTimeout(timer);
        timer = setTimeout(function(){
            callback.apply(context, [event].concat(args) );
        }, delay);
    }
}
