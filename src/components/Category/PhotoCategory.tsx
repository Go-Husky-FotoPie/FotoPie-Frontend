import React from "react";
import styles from "./PhotoCategory.module.css";

const PhotoCategory: React.FC = () => {
  return (
    <>
      <div className={styles.imgArea}>
        <div className={styles.wrapper}>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/1.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Mars</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/2.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>House</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/3.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Flowers</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/4.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Aurora</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/5.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Nature</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/6.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Cloud</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/7.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Coffee</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/8.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Beach</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/9.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Space</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/10.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Dogs</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/11.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Abstract</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/12.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Sea</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/13.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Office</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/14.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Cars</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/15.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Food</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/16.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Cats</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/17.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Machine</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/18.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Night</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/19.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>City</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="#">
              <img src="/category-photos/20.jpg" alt="image" />
            </a>
            <h3 className={styles.tag}>Colorful</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoCategory;
