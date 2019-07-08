<template>
  <div id="container" v-if="isShow">
    <div class="wrap">
      <canvas id="the-canvas"></canvas>
      <el-button type="danger" class="close" size="mini" @click="close">关闭</el-button>
      <p class="foot" v-if="pdfDoc">
        <el-button type="primary" plain size="mini" @click="onPrevPage">上一页</el-button>
        <el-button type="primary" plain size="mini" @click="onNextPage">下一页</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import PDFJS from "pdfjs-dist";
export default {
  data() {
    return {
      isShow: false,
      //通过该属性动态添加类，让pdf显示或隐藏
      pdfDoc: null,
      //可以打印发现是一个对象，里面有页数信息等
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      scale: 0.9
    };
  },
  methods: {
    close() {
      this.isShow = false;
    },
    showPDF(url) {
      this.isShow = true;
      PDFJS.getDocument(url).then(pdf => {
        this.pdfDoc = pdf
        this.renderPage(1)
      })
    },
    renderPage(num) {
      this.pageRendering = true
      this.pdfDoc.getPage(num).then(page => {
        let viewport = page.getViewport(this.scale)
        let canvas = document.getElementById("the-canvas")
        canvas.height = viewport.height
        canvas.width = viewport.width // Render PDF page into canvas context
        let renderContext = {
          canvasContext: canvas.getContext("2d"),
          viewport: viewport
        }
        var renderTask = page.render(renderContext); // Wait for rendering to finish
        renderTask.promise.then(() => {
          this.pageRendering = false
          if (this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(this.pageNumPending)
            this.pageNumPending = null
          }
        })
      })

    },
    queueRenderPage(num) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    },
    onPrevPage() {
      if (this.pageNum <= 1) {
        return;
      }
      this.pageNum--;
      this.queueRenderPage(this.pageNum);
    },
    onNextPage() {
      if (this.pageNum >= this.pdfDoc.numPages) {
        return;
      }
      this.pageNum++;
      this.queueRenderPage(this.pageNum);
    }
  }
};
</script>

<style scoped lang="scss">
#container { background-color: rgba(34, 30, 30, 0.788); position: fixed; width: 100%; height: 100%; top: 0; right: 0; bottom: 0; left: 0; z-index: 10;
  display: flex; justify-content: center; align-items: center; }

.wrap {
  position: relative; width: 540px; height: 760px;
  .close {
    position: absolute;
    right: 20px;
    top: 15px;
    z-index: 20;
    cursor: pointer;
  }
  .foot {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
