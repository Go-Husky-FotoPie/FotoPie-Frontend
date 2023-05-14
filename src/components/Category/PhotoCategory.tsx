import React from "react";
import styles from "./PhotoCategory.module.css";

const PhotoCategory: React.FC = () => {
  return (
    <>
      <div className={styles.imgArea}>
        <div className={styles.wrapper}>
          <div className={styles.singleBox}>
            <a href="/category/mars">
              <img src="/category-photos/1.jpg" alt="mars" />
            </a>
            <h3 className={styles.tag}>Mars</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/building">
              <img src="/category-photos/2.jpg" alt="building" />
            </a>
            <h3 className={styles.tag}>Building</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/flowers">
              <img src="/category-photos/3.jpg" alt="flowers" />
            </a>
            <h3 className={styles.tag}>Flowers</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/aurora">
              <img src="/category-photos/4.jpg" alt="aurora" />
            </a>
            <h3 className={styles.tag}>Aurora</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/nature">
              <img src="/category-photos/5.jpg" alt="nature" />
            </a>
            <h3 className={styles.tag}>Nature</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/cloud">
              <img src="/category-photos/6.jpg" alt="cloud" />
            </a>
            <h3 className={styles.tag}>Cloud</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/coffee">
              <img src="/category-photos/7.jpg" alt="coffee" />
            </a>
            <h3 className={styles.tag}>Coffee</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/beach">
              <img src="/category-photos/8.jpg" alt="beach" />
            </a>
            <h3 className={styles.tag}>Beach</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/space">
              <img src="/category-photos/9.jpg" alt="space" />
            </a>
            <h3 className={styles.tag}>Space</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/dogs">
              <img src="/category-photos/10.jpg" alt="dogs" />
            </a>
            <h3 className={styles.tag}>Dogs</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/abstract">
              <img src="/category-photos/11.jpg" alt="abstract" />
            </a>
            <h3 className={styles.tag}>Abstract</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/sea">
              <img src="/category-photos/12.jpg" alt="sea" />
            </a>
            <h3 className={styles.tag}>Sea</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/office">
              <img src="/category-photos/13.jpg" alt="office" />
            </a>
            <h3 className={styles.tag}>Office</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/cars">
              <img src="/category-photos/14.jpg" alt="cars" />
            </a>
            <h3 className={styles.tag}>Cars</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/food">
              <img src="/category-photos/15.jpg" alt="food" />
            </a>
            <h3 className={styles.tag}>Food</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/cats">
              <img src="/category-photos/16.jpg" alt="cats" />
            </a>
            <h3 className={styles.tag}>Cats</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/machine">
              <img src="/category-photos/17.jpg" alt="machine" />
            </a>
            <h3 className={styles.tag}>Machine</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/night">
              <img src="/category-photos/18.jpg" alt="night" />
            </a>
            <h3 className={styles.tag}>Night</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/city">
              <img src="/category-photos/19.jpg" alt="city" />
            </a>
            <h3 className={styles.tag}>City</h3>
          </div>
          <div className={styles.singleBox}>
            <a href="/category/colorful">
              <img src="/category-photos/20.jpg" alt="colorful" />
            </a>
            <h3 className={styles.tag}>Colorful</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoCategory;
