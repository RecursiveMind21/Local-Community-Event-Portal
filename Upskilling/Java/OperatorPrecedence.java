public class OperatorPrecedence {
    public static void main(String[] args) {
        int result = 10 + 5 * 2; // multiplication first
        System.out.println("10 + 5 * 2 = " + result);
        result = (10 + 5) * 2;
        System.out.println("(10 + 5) * 2 = " + result);
    }
}