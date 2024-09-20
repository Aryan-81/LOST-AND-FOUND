import styles from './page.module.css';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Card1 from '@/components/cards/Card1';
import SVGCtr1 from '@/components/svgctr/SVGctr1';
import data from './Litm.json';

export default function Lost() {
    return (
        <main className={styles.Lost}>
            <Nav />
            <div className={styles.contentNav}>
                <Link href='/lost' ><img src="/lost.svg" alt="lost" /></Link>
                <Link href='/found' ><img src="/find.svg" alt="found" /></Link>
                <Link href='#' ><img src="/usritems.svg" alt="myItem" /></Link>
            </div>
            <div className={styles.ctr}>
                <SVGCtr1 >
                    <div className={styles.lists}>
                        {data.map((item, index) => (
                            <Card1
                                key={index} // Provide a unique key for each element
                                obj={item.obj}
                                usr={item.usr}
                                usrid={item.usrid}
                                description={item.description}
                            />
                        ))}
                    </div>
                </SVGCtr1>
            </div>

        </main>

    );
}
