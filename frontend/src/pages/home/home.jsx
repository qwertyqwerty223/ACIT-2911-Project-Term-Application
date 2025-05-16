import { useState, useEffect } from "react";
import axios from "axios";
import { fetchAllFromEndPoint } from "../../helpers/fetchData";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const [name, setName] = useState("");
  const [firstPageLoad, setFirstPageLoad] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data: projectList } = await axios.post(
        fetchAllFromEndPoint("projects/create-project"),
        { name },
        {
          withCredentials: true,
        }
      );
      setProjects(projectList);
      setName("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleServerSession = async () => {
    try {
      const res = await axios.get(fetchAllFromEndPoint("projects/"), {
        withCredentials: true,
      });
      if (!res.data.length) return;
      if (res.data.sessionId) {
        return console.log("Begin your journey. Enter new project");
      }
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProjectClick = (e) => {
    e.preventDefault();
    navigate(`/${e.target.dataset.name}/timeline/${e.target.dataset.token}`);
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(fetchAllFromEndPoint(`projects/${id}`), {
        withCredentials: true,
      });
      setFirstPageLoad((f) => !f);
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete Project", err);
    }
  };

  useEffect(() => {
    handleServerSession();
  }, [firstPageLoad]);

  return (
    <div className="home-container">
      <form className="home-form" onSubmit={handleSubmit}>
        <input
          className="home-input"
          type="text"
          name="name"
          placeholder="New project name…"
          value={name}
          onChange={handleChange}
          required
        />
        <button type="submit" className="home-submit">
          Create Project
        </button>
      </form>

      <div className="home-projects">
        {projects.map((project) => (
          <div key={project._id} className="home-project">
            <p
              data-token={project.tokenId}
              data-name={project.name}
              onClick={handleProjectClick}
              className="home-projectName"
            >
              {project.name}
            </p>
            <button
              onClick={() => handleDeleteProject(project._id)}
              className="home-delete"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
