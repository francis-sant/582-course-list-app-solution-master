import { shallowMount } from "@vue/test-utils";
import CourseItem from "@/components/CourseItem.vue";

describe("CourseItem.vue", () => {
  it("Is the props course working", () => {
    const course = {
      name: "Vue.js",
      description: "The Progressive JavaScript Framework",
      hours: 50,
      credits: 3,
      location: "Online",
      instructor: "John Doe",
      id: 1,
      enrollment: 10,
    };
    const wrapper = shallowMount(CourseItem, {
      props: {
        course,
      },
    });
    expect(wrapper.find("h2").text()).toBe(course.name);
    expect(wrapper.find("p").text()).toBe(course.description);
  });

  it("uses default props when none are provided", async () => {
    const wrapper = shallowMount(CourseItem);
    const defaultProps = {
      id: 0,
      name: "Course Name",
      credits: 0,
      hours: 0,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis accusantium modi adipisci rem architecto sequi atque mollitia voluptates magnam assumenda at reiciendis aliquid, iusto ab debitis quibusdam molestiae quas commodi?",
      location: "online",
      enrollment: 0,
    };
    expect(wrapper.vm.course).toEqual(defaultProps);
  });

  it("it apply Full when enrollment is Full", async () => {
    const course = {
      name: "Vue.js",
      description: "The Progressive JavaScript Framework",
      hours: 50,
      credits: 3,
      location: "Online",
      instructor: "John Doe",
      id: 1,
      enrollment: 20,
    };
    const wrapper = shallowMount(CourseItem, {
      props: {
        course,
      },
    });

    const enrollmentFull = "full";
    await wrapper.setData({ course });
    expect(wrapper.find("span").text()).toBe(enrollmentFull);
  });

  it(" enrollment status for empty working", async () => {
    const course = {
      enrollment: 0,
    };
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    expect(wrapper.vm.enrollmentStatus).toBe("empty");
  });

  it("computes the enrollmentStatus for spots available", async () => {
    const course = {
      enrollment: 10,
    };
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    expect(wrapper.vm.enrollmentStatus).toBe("available to join");
  });

  it("when the button Add is selected the class is added", async () => {
    const wrapper = shallowMount(CourseItem);
    expect(wrapper.vm.isAdded).toBe(false);
    await wrapper.find("[data-testid='sendAdd' ]").trigger("click");
    expect(wrapper.vm.isAdded).toBe(true);
  });

  it("Shows the button remove when is added", async () => {
    const buttonText = "Remove Course";
    const wrapper = shallowMount(CourseItem);
    expect(wrapper.vm.isAdded).toBe(false);
    await wrapper.setData({ isAdded: true });
    expect(wrapper.find("button").text()).toBe(buttonText);
  });

  it("Emits addCourse event when AddCourse button is clicked", async () => {
    const wrapper = shallowMount(CourseItem);
    await wrapper.find("[data-testid='sendAdd']").trigger("click");
    expect(wrapper.emitted("addCourse")).toBeTruthy();
    expect(wrapper.emitted("addCourse")[0]).toEqual([wrapper.vm.course.id]);
  });
});
