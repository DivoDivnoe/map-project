import PointsList from '../src/components/PointsList.vue';
import NewPoint from '../src/components/NewPoint.vue';
import App from '../src/App.vue';
import Vue from 'vue';

describe('NewPoint.vue', () => {
  it('adds a new point after pushing enter button', () => {
    const AppConstructor = Vue.extend(App);
    const NewPointConstructor1 = Vue.extend(NewPoint);

    const AppComponent = new AppConstructor().$mount();
    const NewPointComponent = new NewPointConstructor1().$mount();

    const input = NewPointComponent.$el.querySelector('.form-control');
    const inputValue = 'new point';
    const pointsLength = AppComponent.points.length;

    input.value = inputValue;

    const clickEvent = new window.Event('keydown');
    input.dispatchEvent(clickEvent);
    NewPointComponent._watcher.run();

    expect(AppComponent.points.length).toEqual(pointsLength + 1);
    expect(
      inputValue in AppComponent.points[AppComponent.points.length - 1]
    ).toBe(true);
  });
});
