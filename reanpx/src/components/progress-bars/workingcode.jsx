import React from 'react';

const Bar = ({ progress, index }) => {
  return <div>
    {index + 1}
    <progress value={progress} max="100">  </progress>
    progress: {progress}
  </div>
}

const CONCURRENCY_BARS = 3;


export default function App() {
  const [bars, setBars] = React.useState({});
  let idNum = React.useRef(0);
  let idsREf = React.useRef(new Array());

  const [progress, setProgress] = React.useState({});
  const [barQueue, setBarqueue] = React.useState([]);
  const [start, setStart] = React.useState('start');
  const [numBarInProgress, setNumBarInProgress] = React.useState(0);

  React.useEffect(() => {
    let intervalId;

    if (start === 'pause') {
      idsREf.current.forEach((timeID) => {
        clearInterval(timeID);
      })
      return;
    }

    if (barQueue.length <=0 || numBarInProgress>=6) {

      return;
    }

    const newBarQueue = [...barQueue];
    const bar = newBarQueue.shift();
    setBarqueue(newBarQueue);
    console.log('number of bars running is ', numBarInProgress)

    const delay = 100;
    setNumBarInProgress((numBarInProgress) => numBarInProgress+2);
    intervalId = setInterval(() => {
      setBars((bars) => {
        let currentProgress = Math.floor(bars[bar.id].progress + (delay/2000)*100);
        
        if (currentProgress > 100) {
          currentProgress = 100;
          clearInterval(intervalId);
          console.log('task completed ', bar.id);
          setNumBarInProgress((numBarInProgress) => numBarInProgress-1);
        }
        return {
          ...bars,
          [bar.id]: {
            ...bars[bar.id],
            progress: currentProgress,
            lastTime:new Date().getTime()
          } 
        }
      })
    },delay)

    idsREf.current.push(intervalId);
    console.log('ids.current is ',idsREf.current);


  }, [barQueue,numBarInProgress, start])

  const onAddClick = () => {
    const id = idNum.current;
    idNum.current = idNum.current + 1;

    const obj = {
      id,
      progress: 0,
      startTime: new Date().getTime(),
      lastTime:new Date().getTime()
    };

    setBars((bars) => {

      return {
        ...bars,
        [id]: obj
      }
    })

    setBarqueue((barQueue) => {
      return [...barQueue, obj];
    })
  }

  const onStartClick = () => {
    if (start === 'start') {
      setStart('pause');
    } else {
       setStart('start');
        setNumBarInProgress(() => 0);
        setBarqueue((barQueue) => {
          const ans = [];
          console.log('bars is ',bars);
          Object.values(bars).forEach((bar) => {
            if (bar.progress > 0 && bar.progress< 100) {
              ans.push({...bar, lastTime: new Date().getTime()})
            }
          })
          return [...ans,...barQueue]
        })
       
    }
  }

  const onResetClick = () => {
    
  }



  return (
    <div>
      <button onClick={onAddClick}>Add</button>
      <button onClick={onStartClick}>{start === 'start' ? 'Pause' : 'Start'}</button>
      <button onClick={onResetClick}>Reset</button>
      <div className="bars-wrapper">
        {Object.keys(bars).map((barKey, index) => <Bar key={bars[barKey].id} progress={bars[barKey].progress} index={index} />)}
      </div>
    </div>
  );
}
