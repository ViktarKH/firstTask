import EventManager from './EventManager';

class SceneManager {
    constructor() {
        this.scenes = {
            intro: document.getElementById('intro-scene'),
            gallery: document.getElementById('gallery-scene'),
            video: document.getElementById('video-scene'),
        };
        this.currentScene = null;

        for (const key in this.scenes) {
            if (!this.scenes[key]) {
                console.error(`Scene element "${key}-scene" not found in DOM!`);
            }
        }
    }

    /**
     * @param {string} sceneName
     * @param {object} [transitionData] Transition data
     */
    
    goToScene(sceneName, transitionData = {}) {
        if (!this.scenes[sceneName]) {
            console.error(`Scene "${sceneName}" does not exist.`);
            return;
        }

        if (this.currentScene && this.currentScene !== this.scenes[sceneName]) {
            this.currentScene.classList.remove('active');
            this.currentScene.classList.add('hidden');
        }


        const nextScene = this.scenes[sceneName];
        nextScene.classList.remove('hidden');
        nextScene.classList.add('active');

        this.currentScene = nextScene;
        EventManager.log(`scene_change:${sceneName}`, transitionData);
    }

    /**
     * @returns {HTMLElement|null}
     */
    getCurrentSceneElement() {
        return this.currentScene;
    }
}

export default SceneManager;