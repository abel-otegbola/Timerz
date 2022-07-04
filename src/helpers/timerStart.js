
const TimerStart = (timer) => {
    return [
        ((timer.elapsed[0] > 0 && timer.elapsed[1] === 0 && timer.elapsed[2] === 0) ? timer.elapsed[0] - 1 : timer.elapsed[0]),
        ((timer.elapsed[1] > 0 && timer.elapsed[2] === 0) ? timer.elapsed[1] - 1 : ((timer.elapsed[1] < 1 && timer.elapsed[2] < 1) ? 59 : timer.elapsed[1]) ), 
        (timer.elapsed[2] < 1 ? 59 : timer.elapsed[2] - 1)
    ]
}

export default TimerStart;