import { useState } from 'react';
import styles from '../assets/stylesComponents/Add.module.css';

function Add({ addTask }) {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const id = Math.floor(Math.random() * 1000);
    // Usei o Math.random para gerar um id aleatório para cada tarefa adicionada

    function executeSubmit(e) {
        e.preventDefault();
        addTask({ id, title, description, complete: false });
        setTitle('');
        setDescription('');
        // Após a tarefa ser adicionada os inputs do título e da descrição serão limpos
    }

    return (
        <div className={styles.container}>
            <h2>Adicionar:</h2>
            <form className={styles.form} onSubmit={executeSubmit}>
                <input 
                type="text" 
                className={styles.inputTitle}
                placeholder='Título'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />

                <input 
                type="text" 
                className={styles.inputTitle}
                placeholder='Descrição (Opcional)'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <button id={styles.btnAdd} type='submit'>Adicionar</button>
            </form>
        </div>  
    )
}

export default Add