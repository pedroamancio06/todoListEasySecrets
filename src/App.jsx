import { useState, useEffect } from 'react';
import './App.css';

/* Import Components */
import Filters from './components/Filters';
import Task from './components/Task';
import Add from './components/Add';

/* Import icons */
import { FaRegMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";

function App() {

  /*
    Definindo as propriedades para receber e definir: tarefas(tasks), filtros(filters), pesquise por título(search), edit e dark mode
  */
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [filter, setFilter] = useState('Todas');
  const [search, setSearch] = useState('');
  const [edit, setEdit] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  /*
    Função que irá receber um parâmetro passado pelo compontent Add.jsx: o title, description e status comcluded.
      -> E adicionará a tarefa no início da lista
  */
  function add(task) {
    const listTask = [task, ...tasks];
    setTasks(listTask);
  }

  /* Função que defini a tarefa com concluída e atualiza ela no localStorage */
  function completeTask(taskId) {
    const listTask = tasks.map(task => {
      if (taskId === task.id) {
        task.complete = !task.complete;
      }
      return task;
    });
    setTasks(listTask);
  }

  /* Função que deleta a tarefa e atualiza a lista no localStorage */
  function deleteTask(taskId) {
    const listTasks = [...tasks];
    setTasks(listTasks.filter(task => taskId !== task.id));
  }

  /* Função que edita a tarefa e atualiza ela no localStorage */
  function editTask( taskId, newTitle, newDescription) {
    const listTask = tasks.map(task => {
      if (taskId === task.id) {
        task.title = newTitle;
        task.description = newDescription;
      } 
      return task;
    })
    setTasks(listTask);
    setEdit(null);
  } 

  useEffect(() => {
    /* Atualiza o localStorage quando uma tarefa é adicionada, deletada, concluída e editada. 
     E após atualizar os dados as tarefas seguem salvas */ 
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={`todoContainer ${darkMode ? 'darkMode' : ''}`}>
      <span className='header'>
        <h1 className='titleTodo'>To Do List</h1>
        <button className={`btnMode ${darkMode ? 'btnDark' : 'btnLight'}`} onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <GoSun /> : <FaRegMoon />}
        </button>
      </span>
      <Filters setSearch={setSearch} setFilter={setFilter}/>

      {/* Usando o atributo "length" para verificar se a lista de tarefas está vazia */}
      {tasks.length === 0 ? (
        <h2 className='emptyListTask'>Nenhuma tarefa adicionada</h2>
      ) : (
        <div className='taskContainer'>
          {tasks.map(task => {
            if (filter === 'Todas' ? true : filter === 'Ativas' ? !task.complete : task.complete) {
              if (task.title.toUpperCase().includes(search.toUpperCase())) { 
                /* Poderia usar o "===" ao invés do includes, porém o "includes" permite realizar uma pesquisa parcial 
                e não somente específica */ 
                return (
                  <Task 
                    tasks={task} 
                    key={task.id} 
                    deleteTask={deleteTask}
                    completeTask={completeTask}
                    setEdit={setEdit}
                    editTask={editTask}
                    editId={edit}
                  />  
              )}
            }
            
            return null;
          })}
        </div>
      )}

      <Add addTask={add}/>
    </div>
  )
}

export default App
