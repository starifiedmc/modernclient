const { createApp } = Vue;

createApp({
  data() {
    return {
      ready: false,
      openDropdown: false,
      buildOptions: [
        { value: 'js', label: 'JavaScript Build' },
        { value: 'wasm', label: 'WASM Build' }
      ],
      selectedBuild: { value: 'wasm', label: 'WASM Build' },
      mouseX: 0.5,
      mouseY: 0.5
    };
  },
  computed: {
    bgStyle() {
      const tx = (this.mouseX - 0.5) * 30;
      const ty = (this.mouseY - 0.5) * 24;
      return {
        transform: `translate(${tx}px, ${ty}px) scale(1.12)`
      };
    }
  },
  methods: {
    selectBuild(option) {
      this.selectedBuild = option;
      this.openDropdown = false;
    },
    launchSelectedBuild() {
      const route = this.selectedBuild.value === 'wasm' ? './wasm/' : './js/';
      window.location.assign(route);
    },
    onMouseMove(event) {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      this.mouseX = event.clientX / w;
      this.mouseY = event.clientY / h;
    }
  },
  mounted() {
    requestAnimationFrame(() => {
      this.ready = true;
    });

    document.addEventListener('click', (e) => {
      const dropdown = document.querySelector('.dropdown');
      if (!dropdown) return;
      if (!dropdown.contains(e.target)) {
        this.openDropdown = false;
      }
    });
  }
}).mount('#app');
