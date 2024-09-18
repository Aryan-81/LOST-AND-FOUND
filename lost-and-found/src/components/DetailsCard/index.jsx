import styles from './DetailsCard.module.css'

export default function DetailsCard({ obj, usr, usrid, description, objid }) {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <img src="" alt="object" />
                <div className={styles.Details}>
                    <h1>{obj}</h1>
                    <h3>{usrid}</h3>
                    <div>
                        <p>{usr}</p>
                        <p>upload date</p>
                    </div>
                    <p className={styles.dicription}>{description}</p>
                    <div className={styles.contact}>
                        contact details
                    </div>
                </div>

            </div>
        </div>
    )
}