import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { fetchAllFromEndPoint } from '../../helpers/fetchData';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [name, setName] = useState("");
  const [firstPageLoad, setFirstPageLoad] = useState(false)
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post(fetchAllFromEndPoint('projects/create-project'), {name}, {
            withCredentials: true
        })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
  };

  const handleServerSession = async () => {
    try {
        const res = await axios.get(fetchAllFromEndPoint('projects/'), {
            withCredentials: true
        })
        // If the response returns no data or an empty data object, escape the function
        if(!res.data.length) return 
        // If the res.data returns the sessionId, it means the user is using the application for the first time.
        if(res.data.sessionId){
          return console.log("Begin your journey. Enter new project")
        }
        setProjects(res.data)
    } catch (error) {
        console.log(error)
    }
  }

  const handleProjectClick = (e) => {
    e.preventDefault()
    navigate(`/${e.target.dataset.name}/timeline/${ e.target.dataset.token}`)
  }

  useEffect(()=>{
    handleServerSession()
  },[firstPageLoad])

  return (
    <div>
        <form>
            <div>
                <label>Name:</label><br />
                <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
                />
            </div>

            <button onClick={handleSubmit}>Submit</button>
        </form>
        <div>
          {
            projects && projects.map((project) => (<p key={project._id} data-token={project.tokenId} data-name={project.name} onClick={handleProjectClick}>{project.name}</p>))
          }
        </div>
    </div>
    
  );
  
}

export default Home