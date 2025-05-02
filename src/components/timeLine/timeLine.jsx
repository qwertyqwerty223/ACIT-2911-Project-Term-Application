import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './timeLine.css'
import activities from '../../data/sample';


function TimeLine() {
  return (
    <div className='timeline'>
        <VerticalTimeline>
            {
                activities.map((a) => (
                    <VerticalTimelineElement
                    className="vertical-timeline-element--work"  
                    contentStyle={{ background: '#fff', color: '#000' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date={a.date}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    key={a.id}
                >
                    <h3 className="vertical-timeline-element-title">{a.title}</h3>
                    <p>{a.description}</p>
                </VerticalTimelineElement>
                ))
            }
            
            
        </VerticalTimeline>
    </div>
  )
}

export default TimeLine