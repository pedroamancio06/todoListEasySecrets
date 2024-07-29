import styles from '../assets/stylesComponents/Edit.module.css'

function Edit({  toSave, setNewDescription, setNewTitle, newTitle, newDescription, setIsEditing }) {
    return (
        <form className={styles.form} onSubmit={
            () => {
                toSave();
                setIsEditing(false);
            }
        } >
            <input 
                type="text" 
                className={styles.newTitle}
                value={newTitle} 
                required
                onChange={(e) => setNewTitle(e.target.value)} 
            />
            <input 
                type="text" 
                className={styles.newDescription}
                value={newDescription}
                placeholder='Descrição (Opcional)' 
                onChange={(e) => setNewDescription(e.target.value)} 
            />
            <button className={styles.btnSave} type='submit'>Salvar</button>
        </form>
    )
}

export default Edit 