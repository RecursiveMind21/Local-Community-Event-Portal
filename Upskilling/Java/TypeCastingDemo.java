public class TypeCastingDemo {
    public static void main(String[] args) {
        double d = 9.78;
        int i = (int) d; // explicit casting
        System.out.println("double " + d + " cast to int: " + i);

        int x = 10;
        double y = x; // implicit casting
        System.out.println("int " + x + " cast to double: " + y);
    }
}