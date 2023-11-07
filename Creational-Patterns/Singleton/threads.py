from threading import Lock, Thread

# This is a thread safe version of singleton
class SingletonMeta(type):

    _instances = {}

    _lock: Lock = Lock()

    def __call__(cls, *args, **kwargs):
        # Possible changes to the value of the `__init__` argument do not affect the instance
        # The first thread to aquire the lock will continue and the rest wait here
        with cls._lock:
            # The first thread to get the lock will reach the condistional and make the singleton
            # Once it leaves the lock all threads that follow will get the single that was already created
            if cls not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
        return cls._instances[cls]


class Singleton(metaclass=SingletonMeta):
    # We can use this to test if the threades singleton works
    value: str = None

    def __init__(self, value: str) -> None:
        self.value = value

    def some_business_logic(self):
        # Some bussiness logic
        pass


def test_singleton(value: str) -> None:
    singleton = Singleton(value)
    print(singleton.value)


if __name__ == "__main__":

    print("If you see the same value, then singleton was reused (yay!)\n"
          "If you see different values, "
          "then 2 singletons were created (booo!!)\n\n"
          "RESULT:\n")

    process1 = Thread(target=test_singleton, args=("FOO",))
    process2 = Thread(target=test_singleton, args=("BAR",))
    process1.start()
    process2.start()