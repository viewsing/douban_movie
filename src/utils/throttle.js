//函数节流器
export default (callback, delay, mustRunDelay) => {
    let timer = null;
    let t_start;
    return function(event) {
        let context = this, args = arguments, t_current = +new Date();
        event.persist && event.persist(); //兼容react的合成事件不能异步访问事件的问题

        if (!t_start) {
            t_start = t_current;
        }
        if (t_current - t_start >= mustRunDelay) {
            callback.apply(context, [event].concat(args) );
            t_start = t_current;
        } else {
            clearTimeout(timer);
            timer = setTimeout(function(){
                callback.apply(context, [event].concat(args) );
            }, 100);
        }
    }
}
