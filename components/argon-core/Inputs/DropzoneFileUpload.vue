<template>
  <!-- eslint-disable -->
  <div
    class="dropzone mb-3 dz-clickable"
    :class="[multiple ? 'dropzone-multiple' : 'dropzone-single']"
  >
    <div class="fallback">
      <div class="custom-file">
        <input
          id="projectCoverUploads"
          type="file"
          class="custom-file-input"
          :multiple="multiple"
        />
        <label class="custom-file-label" for="projectCoverUploads"
          >Choose file</label
        >
      </div>
    </div>
    <div
      v-if="!multiple"
      ref="previewSingle"
      class="dz-preview dz-preview-single"
      :class="previewClasses"
    >
      <div class="dz-preview-cover">
        <img class="dz-preview-img" data-dz-thumbnail />
      </div>
    </div>
    <ul
      v-else
      ref="previewMultiple"
      class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"
      :class="previewClasses"
    >
      <li class="list-group-item px-0">
        <div class="row align-items-center">
          <div class="col-auto">
            <div class="avatar">
              <img class="avatar-img rounded" data-dz-thumbnail />
            </div>
          </div>
          <div class="col ml--3">
            <h4 class="mb-1" data-dz-name>
              ...
            </h4>
            <p class="small text-muted mb-0" data-dz-size>
              ...
            </p>
          </div>
          <div class="col-auto">
            <button data-dz-remove="true" class="btn btn-danger btn-sm">
              <i class="fas fa-trash" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'DropzoneFileUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    value: [String, Object, Array],
    url: {
      type: String,
      default: '/'
    },
    multiple: Boolean,
    previewClasses: [String, Object, Array]
  },
  data() {
    return {
      currentFile: null,
      files: [],
      showList: false
    }
  },
  async mounted() {
    this.initDropzone()
  },
  methods: {
    async initDropzone() {
      let Dropzone = await import('dropzone')
      Dropzone = Dropzone.default || Dropzone
      Dropzone.autoDiscover = false
      let preview = this.multiple
        ? this.$refs.previewMultiple
        : this.$refs.previewSingle
      let self = this
      let finalOptions = {
        ...this.options,
        url: this.url,
        thumbnailWidth: null,
        thumbnailHeight: null,
        maxFilesize: 25,
        dictDefaultMessage: 'anexar arquivos',
        dictFileTooBig: 'tamanho maximo de anexo é 25mb',
        dictInvalidFileType:
          'mercado livre só aceita arquivos JPEG, PNG, PDF e TXT',
        previewsContainer: preview,
        previewTemplate: preview.innerHTML,
        maxFiles: !this.multiple ? 1 : null,
        acceptedFiles: '.png, .jpeg, .txt, .pdf',
        init: function () {
          this.on('addedfile', function (file) {
            if (!self.multiple && self.currentFile) {
              console.log(this.currentFile)
              // this.removeFile(this.currentFile);
            }
            self.currentFile = file
          })
          this.on('error', function (file, errorMessage) {
            alert('error : ' + errorMessage)
            this.removeFile(file)
          })

          this.on('reset', function (file) {
            alert('mensagem enviada')
            this.removeAllFiles(true)
          })
        }
      }
      this.dropzone = new Dropzone(this.$el, finalOptions)
      preview.innerHTML = ''
      let evtList = [
        'drop',
        'dragstart',
        'dragend',
        'dragenter',
        'dragover',
        'addedfile',
        'removedfile',
        'thumbnail',
        'error',
        'processing',
        'uploadprogress',
        'sending',
        'success',
        'complete',
        'canceled',
        'maxfilesreached',
        'maxfilesexceeded',
        'processingmultiple',
        'sendingmultiple',
        'successmultiple',
        'completemultiple',
        'canceledmultiple',
        'totaluploadprogress',
        'reset',
        'queuecomplete'
      ]
      evtList.forEach(evt => {
        this.dropzone.on(evt, data => {
          this.$emit(evt, data)

          if (evt === 'addedfile') {
            console.log(data)
            this.files.push(data)
            this.$emit('change', this.files)
          } else if (evt === 'removedfile') {
            let index = this.files.findIndex(
              f => f.upload.uuid === data.upload.uuid
            )
            if (index !== -1) {
              this.files.splice(index, 1)
            }
            this.$emit('change', this.files)
          }
        })
      })
    }
  }
}
</script>
<style></style>
