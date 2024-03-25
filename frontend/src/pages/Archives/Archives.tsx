import styles from './archives.module.css';

export default function ArchivesPage() {
  const images: string[] = []
  function createImages(n: number) {
    for (let i = 0; i < n; i++) {
      images.push("./lesion-with-hair.png")
    }
  }
  createImages(8);

  return <div>
    <h1>Archives</h1>
      <div className={styles.page}>
        <div className={styles.filter}>
          <h1>Filter</h1>
          <h3>Patient:</h3>
          <select className={styles['filter-input']}>
            <option>Patient 1</option>
            <option>Patient 2</option>
            <option>Patient 3</option>
          </select>
          <h3>Start Date</h3>
          <input type='date' className={styles['filter-input']}></input>
          <h3>End Date</h3>
          <input type='date' className={styles['filter-input']}></input>
        </div>
        <div className={styles.archives}>
          <h1>Archives</h1>
          {images.map((image) => {
              return <div>
                <img src={image} className={styles.image}/>
                <h4>Patient Name</h4>
                <p>01/01/01</p>
                <button className={styles['select-btn']}>Select</button>
              </div>
          })}
        </div>
      </div>
  </div>
}