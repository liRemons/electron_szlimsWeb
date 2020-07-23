<template>
  <div style="margin-top: 60px;">
    <input type="file" accept="image/*" @change="onFileChange" multiple />
    <p v-if="!isNaN(before)">压缩前:{{ before }}kb</p>
    <p v-if="!isNaN(after)">压缩后:{{ after }}kb</p>
    <img :src="img" alt="" />
  </div>
</template>

<script>
import lrz from "lrz";
export default {
  data() {
    return {
      imgUrl: [],
      before: NaN,
      after: NaN,
      img: "",
    };
  },
  methods: {
    onFileChange(e) {
      function blobToDataURL(blob, cb) {
        let reader = new FileReader();
        reader.onload = function (evt) {
          var base64 = evt.target.result;
          cb(base64);
        };
        reader.readAsDataURL(blob);
      }
      // 获取文件对象

      var img = e.target.files[0];
      if (img) {
        var url = URL.createObjectURL(img);
        var base64 = blobToDataURL(img, (base64Url) => {
          var file = this.dataURLtoFile(base64Url, '"aaa"');
          this.before = file.size / 1024;
          this.imgUrl = URL.createObjectURL(file, { quality: 0 });
          lrz(this.imgUrl, { quality: 0.4 }).then((rst) => {
            // 压缩后文件大小
            this.img = rst.base64;
            console.log(rst)
            this.after = rst.fileLen / 1024;
          });
        });
      }
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  },
};
</script>