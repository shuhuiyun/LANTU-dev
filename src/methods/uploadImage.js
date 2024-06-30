import axios from 'axios';

export default class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const formData = new FormData();
    formData.append('file-to-upload', await this.loader.file);
    const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/upload`;

    return axios.post(api, formData).then((res) => {
      if (res.data.success) {
        this.data.default = process.env.VUE_APP_TARGET_URL + res.data.imageUrl;
      } else {
        this.data.default = {};
      }
    });
  }

  abort() {
    this.reader.abort();
  }
}
