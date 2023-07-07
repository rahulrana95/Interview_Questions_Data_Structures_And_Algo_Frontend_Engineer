// @ts-nocheck
import React from 'react';

type BarPropsT = {
    progress: number,
    index: number
}

type BarType = {
    id: number,
    progress: number
}

const Bar = ({ progress, index }: BarPropsT) => {
  return <div>
    {index + 1}
    <progress value={progress} max="100">  </progress>
    progress: {progress}
  </div>
}

const CONCURRENCY_BARS: number = 3;


type BarStateTypeVal = {
    string: BarType
} | null

type BarsStateT = BarStateTypeVal | ((bars: { string: BarType; } | null) => { string: BarType })

export default function ProgressBars() {
  const [bars, setBars] = React.useState<BarsStateT>(null);
  let idNum = React.useRef(0);
  let idsREf = React.useRef(new Array());

  const [barQueue, setBarqueue] = React.useState<BarType[]>([]);
  const [start, setStart] = React.useState<'start' | 'pause'>('start');
  const [numBarInProgress, setNumBarInProgress] = React.useState<number>(0);

  React.useEffect(() => {
    let intervalId:ReturnType<typeof setInterval>;

    if (start === 'pause') {
      idsREf.current.forEach((timeID) => {
        clearInterval(timeID);
      })
      return;
    }

    if (barQueue.length <=0 || numBarInProgress>=6) {

      return;
    }

    const newBarQueue: BarType[] = [...barQueue];
    const bar: BarType | undefined = newBarQueue.shift();
    setBarqueue(newBarQueue);
    console.log('number of bars running is ', numBarInProgress)

    const delay = 100;
    setNumBarInProgress((numBarInProgress) => numBarInProgress+2);
    intervalId = setInterval(() => {
      setBars((bars: {string: BarType} | null) => {
        let currentProgress = bar && bars && Math.floor(bars[String(bar.id)]?.progress + (delay/2000)*100);
        
        if (currentProgress && currentProgress > 100) {
          currentProgress = 100;
          clearInterval(intervalId);
          console.log('task completed ', bar?.id);
          setNumBarInProgress((numBarInProgress) => numBarInProgress-1);
        }
        return {
          ...bars,
          [bar?.id ?? '']: {
            ...bars[bar?.id ?? ''],
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
      progress: 0
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
          const ans:BarType[] = [];

          Object.values<BarType>(bars).forEach((bar) => {
            if (bar.progress > 0 && bar.progress< 100) {
              ans.push({...bar})
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
        {Object.keys(bars || {}).map((barKey, index) => <Bar key={bars[barKey].id} progress={bars[barKey].progress} index={index} />)}
      </div>
    </div>
  );
}
