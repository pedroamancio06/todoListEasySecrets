import styles from '../assets/stylesComponents/Filters.module.css';

function Filters({ setFilter, setSearch}) {

    return (
        <div className={styles.container}>
                <h2>Filtrar:</h2>
                <span className={styles.inputsContainer}>
                    <input 
                        id={styles.inputSearch}
                        type="text" 
                        placeholder='Pesquise um título...'
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select 
                        name="selectStatus" 
                        id={styles.selectStatus}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="Todas">Todas</option>
                        <option value="Ativas">Ativas</option>
                        <option value="Concluidas">Concluídas</option>
                    </select>
                </span>
            </div>
    )
}

export default Filters