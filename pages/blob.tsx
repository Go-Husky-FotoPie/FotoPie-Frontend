import type { NextPage } from "next";
import ImageDownloader from "../src/components/ImageDownloader/ImageDownloader";

const BlobTest: NextPage = () => {
  const imageUrl =
    "https://fotopie-photo.s3.ap-southeast-2.amazonaws.com/0a213a4c-ba70-478c-825a-8ec70c67ccb6.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkgwRgIhAK6CRObXZSZu2QLw6VKYWQdGwDQJkE4MSUNpOG3%2F7yC0AiEA%2Blg3onw%2BUy4amB09Zn5S7jB7XSanucCowhoq1RnlS2Mq7QIIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwzMzA1NTE3ODIzODkiDHR9cPCQbGejjrk8yyrBAo3D5Eyso3qpqUcHYrJW%2Bd%2BH7vM3p10%2FqpDms0nGwNg17VIr%2FGCsiDqKkd3tOoTru5Q45PT0KyXVpyH5joXi9ivezafRA6vnsrslMaX9mccjBoDJ3vjnY%2Fst0mbgeB6XUvxDFA206XW3zPJOyk9edJTHYBFR%2BlhEIzyfZGK1W0u76Jixg0OBT6zpSAK0DBM5hPs96B812Jk0pvwjEwGjkWZTnbdc%2Br0NZ0c%2F%2Buw4Rt3tmeqIft2AVgkYcjOsAh7p6J8S9tVEFV7f2SevDUP6o6Cy524stW95X76uJ6s%2BhmFPDwjQN0QDRKvh%2FdvLqhg8ACFpw2TiJ7YZVKcPmNJMJIZdquBNABDdTUsRv23cN0NsSfQrKvNwT%2FP6KSTdHvL2QU5Gh5fM8%2B3fMlgrKhgb7qtipYkO%2FX581yTxRllzL%2BTo%2BTCt0OagBjqyAud1BUMTE2H7GpI72I6uh4D1EWOdeQXLGR7ZM%2FrzBPzdQCBDp%2Bhz2ptzZtwC0lFtQPLoS2ab5HkuzsgOyx%2BGXN73XZhaO6x59T9mH7w6GT3lfMK1xi7FzsSxpmkahd6TXbx%2FH5th5BlYSpgKlmBaDFZtliJU%2BX4Q9iDSaZ70v7HfmGHf42FRShc9lT1DKagXP77gFkWYvXbtoqcI4IqkTVkQLLBnNKLkU3Cthp0H7X3ROjpAU89lIGhvDjPljmoYZwNgTkNtivXAqLXeuEhXFxnjX%2Bohq6Rzb00MtwXMsGiETkz03bFmsLe7QKG6zRgx9cORRzNMSu%2BDSKe5l%2BP2SGYZz8DorFzM51MFm8w3OTtlP4g3qjsV3xCenrQtsCFx42QgSfpOzDUNoMZSHFYej09t5g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230321T233753Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAUZ5TL5P237FDSYNY%2F20230321%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=3f85ea073c5fbff7e7d9820dfdfac9a36b51b4e501748d34abf90cf4916bf655";
  const randomString = Math.random().toString(36).substring(2);
  const timestamp = Date.now().toString(36);
  const fileName = `${timestamp}-${randomString}.jpg`;

  return (
    <div>
      <h1>Image Downloader</h1>
      <ImageDownloader imageUrl={imageUrl} fileName={fileName} />
    </div>
  );
};

export default BlobTest;
