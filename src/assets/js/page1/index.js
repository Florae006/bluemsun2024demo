const skillArray = [
    {
        name: 'HTML/CSS',
        percent: '60%',
    },
    {
        name: 'JavaScript',
        percent: '70%',
    },
    {
        name: 'Vue3',
        percent: '90%',
    },
    {
        name: 'Algorithm',
        percent: '50%',
    },
    {
        name: 'Linux',
        percent: '50%',
    },
];

const softwareArrary = [
    {
        name: 'VS Code',
        percent: '90%',
    },
    {
        name: 'Ideal',
        percent: '80%',
    },
    {
        name: 'PyCharm',
        percent: '60%',
    },
    {
        name: 'Typora',
        percent: '50%',
    },
];

const timelineWorkArray = [
    {
        title: '经历1',
        content: '经历描述1',
        startTime: '2024-01-01',
        endTime: 'Now',
    },
    {
        title: '经历2',
        content: '经历描述2',
        startTime: '2023-02-01',
        endTime: '2023-11-01',
    },
    {
        title: '经历3',
        content: '经历描述3',
        startTime: '2022-02-01',
        endTime: '2023-11-01',
    },
];

window.onload = function () {
    // 方法1
    for (var i = 0; i < skillArray.length; i++) {
        var skillElement = document.createElement('div');
        skillElement.className = 'skill';
        skillElement.appendChild(document.createElement('h3'));
        skillElement.appendChild(document.createElement('div'));
        skillElement.childNodes[0].className = 'common-font-en';
        skillElement.childNodes[0].innerHTML = `${skillArray[i].name}<span class="progress-text">${skillArray[i].percent}</span>`;
        skillElement.childNodes[1].className = 'progress';
        skillElement.childNodes[1].appendChild(document.createElement('div'));
        skillElement.childNodes[1].childNodes[0].className = 'progress-bar';
        skillElement.childNodes[1].childNodes[0].style.width = skillArray[i].percent;

        document.getElementById('skill-box').appendChild(skillElement);
    }
    // 方法2
    for (var i = 0; i < softwareArrary.length; i++) {
        var softwareElement = document.createElement('div');
        softwareElement.className = 'software';
        softwareElement.innerHTML = `
        <h3 class="common-font-en">${softwareArrary[i].name}<span class="progress-text">${skillArray[i].percent}</span></h3>
        <div class="progress">
        <div class="progress-bar" style="width: ${softwareArrary[i].percent};"></div>
        </div>
    `;
        document.getElementById('software-box').appendChild(softwareElement);
    }

    // 方法3
    for(var i = 0; i < timelineWorkArray.length; i++) {
        var timelineElement = document.createElement('li');
        timelineElement.innerHTML = `
        <h3>${timelineWorkArray[i].title}</h3>
        <span>${timelineWorkArray[i].content}</span>
        <span class="time common-font-en">Time：${timelineWorkArray[i].startTime} to ${timelineWorkArray[i].endTime}</span>
        `
        document.getElementById('work-timeline').appendChild(timelineElement);
    }

}