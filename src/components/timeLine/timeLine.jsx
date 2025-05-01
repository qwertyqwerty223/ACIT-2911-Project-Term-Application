import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Camera } from 'lucide-react'
import './timeLine.css'


function TimeLine() {
  return (
    <div className='timeline'>
        <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"n  
                contentStyle={{ background: '#fff', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date="April 29 - May 2"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Week 1</h3>
                <h4 className="vertical-timeline-element-subtitle">Sprint</h4>
                <p>Working on the UI skeleton</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#fff', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date="May 5 - May 9"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Week2</h3>
                <h4 className="vertical-timeline-element-subtitle">Sprint</h4>
                <p>Working on CRUD operations for calender</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#fff', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date="May 5 - May 9"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                
            >
                <h3 className="vertical-timeline-element-title">Week3</h3>
                <h4 className="vertical-timeline-element-subtitle">Sprint</h4>
                <p>
                Working on authentication and authorization for the backend 
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#fff', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date="May 12 - May 16"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                
            >
                <h3 className="vertical-timeline-element-title">Week 4</h3>
                <h4 className="vertical-timeline-element-subtitle">Sprint</h4>
                <p>CRUD operations with team members and finalizing the application features</p>
            </VerticalTimelineElement>
            
        </VerticalTimeline>
    </div>
  )
}

export default TimeLine