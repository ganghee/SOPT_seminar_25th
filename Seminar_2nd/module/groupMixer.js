const groupMixer = {
    mix: (arr) => {
        let delta;
        for(let i = arr.length; i; i-=1) {
            delta = Math.floor(Math.random()*i);
            [arr[delta], arr[i-1]] = [arr[i-1], arr[delta]];
        }
        return arr;
    }
}

module.exports = groupMixer;