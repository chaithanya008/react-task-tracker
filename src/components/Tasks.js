import Task from './Task';

// const tasks = [
//   {
//     id: 1,
//     text: 'Doctors Appointment',
//     day: 'Feb 5 2021',
//     reminder: true,
//   },
//   {
//     id: 2,
//     text: 'Meeting with Ken',
//     day: 'June 15 2021',
//     reminder: true,
//   },
//   {
//     id: 3,
//     text: 'Phone call with Arun',
//     day: 'March 20 2021',
//     reminder: false,
//   },
// ];

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  );
};

export default Tasks;
