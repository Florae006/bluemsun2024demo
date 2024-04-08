const min = document.getElementById('min');
const max = document.getElementById('max');
const input = document.getElementById('input');
const submit = document.getElementById('submit');
const range = document.getElementById('range');
const times = document.getElementById('times');
const result = document.getElementById('result');
const reset = document.getElementById('reset');

let minNum = 0;
let maxNum = 100;
let target = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
let count = 0;

range.innerHTML = `${minNum} ~ ${maxNum}`;

submit.onclick = () => {
    // 判空
    if (!input.value) {
        alert('请输入数字！');
        return;
    }
    let guess = parseInt(input.value);
    if (guess < minNum || guess > maxNum) {
        alert('请输入范围内的数字！');
        return;
    }
    count++;
    times.innerHTML = count;
    if (guess === target) {
        result.innerHTML = '🎉恭喜你猜对了！';
    } else if (guess < target) {
        result.innerHTML = '👇猜小了！';
    } else {
        result.innerHTML = '👆猜大了！';
    }
}

reset.onclick = () => {
    target = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
    count = 0;
    times.innerHTML = count;
    result.innerHTML = '';
    input.value = '';
    alert('已重置！');
}

min.onchange = () => {
    // 不能超过最大值
    if (parseInt(min.value) >= maxNum) {
        alert('最小值不能超过最大值！');
        min.value = minNum;
        return;
    }
    // 判空
    if (!min.value) {
        alert('请输入数字！');
        return;
    }
    minNum = parseInt(min.value);
    range.innerHTML = `${minNum} ~ ${maxNum}`;
    target = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
    count = 0;
    times.innerHTML = count;
    result.innerHTML = '';
}

max.onchange = () => {
    // 不能小于最小值
    if (parseInt(max.value) <= minNum) {
        alert('最大值不能小于最小值！');
        max.value = maxNum;
        return;
    }
    // 判空
    if (!max.value) {
        alert('请输入数字！');
        return;
    }
    maxNum = parseInt(max.value);
    range.innerHTML = `${minNum} ~ ${maxNum}`;
    target = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
    count = 0;
    times.innerHTML = count;
    result.innerHTML = '';
}
