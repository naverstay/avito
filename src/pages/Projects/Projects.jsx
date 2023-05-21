import Answers from 'components/Answers/Answers';
import MyProjects from 'components/MyProjects/MyProjects';

export default function Projects() {
  return (
    <>
      <main className="projects">
        <div className="projects__inner">
          <MyProjects />
        </div>
      </main>
      <Answers />
    </>
  );
}
