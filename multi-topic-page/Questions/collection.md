Java Collections Framework- An architecture to store, manipulate group of objects
Java Collections Framework (JCF) is a unified architecture provided by Java to store, manipulate, and process groups of objects efficiently.


It provides:
Interfaces (Collection, List, Set, Map)
Implementations (ArrayList, LinkedList, HashSet, HashMap, etc.)
Algorithms (sorting, searching, synchronization)


Java Collections Framework is a set of interfaces and classes used to store and manipulate groups of objects dynamically. It provides common interfaces such as List, Set, Queue, and Map along with implementations like ArrayList, LinkedList, HashSet, and HashMap.


The main goal is to provide reusable data structures and algorithms so developers don't need to implement them from scratch.


Java Collections Framework
│
├── Iterable
│   ├── iterator()
│   ├── forEach()
│   └── spliterator()
│
├── Collection
│   │
│   ├── List
│   │   │
│   │   ├── ArrayList
│   │   │   ├── Backed by Array
│   │   │   ├── Ordered
│   │   │   ├── Duplicate Allowed
│   │   │   ├── Dynamic Resize
│   │   │   └── Random Access
│   │   │
│   │   └── LinkedList
│   │       ├── Doubly Linked List
│   │       ├── Ordered
│   │       ├── Duplicate Allowed
│   │       ├── Null Allowed
│   │       └── Sequential Access
│   │
│   └── Set
│       │
│       ├── HashSet
│       │   ├── Uses HashMap
│       │   ├── Unique Elements
│       │   ├── One Null
│       │   └── No Order
│       │
│       ├── LinkedHashSet
│       │   ├── Uses LinkedHashMap
│       │   ├── Unique Elements
│       │   ├── One Null
│       │   └── Maintains Insertion Order
│       │
│       └── TreeSet
│           └── Sorted Order
│
└── Map
│
├── HashMap
│   ├── Array of Buckets
│   ├── Unique Keys
│   ├── One Null Key
│   ├── Load Factor 0.75
│   └── Not Ordered
│
├── LinkedHashMap
│   ├── HashMap + Doubly Linked List
│   ├── Insertion Order
│   └── Access Order (LRU)- if access order is true, default false
│
├── Hashtable
│   ├── Synchronized
│   ├── No Null Key
│   └── No Null Value
│
└── ConcurrentHashMap


Why Was It Introduced?
Before Collections, Java had:
Vector
Stack
Hashtable


Problems:
Different APIs
Not standardized
Difficult to maintain


Java Collections Framework introduced:


Common Interfaces
+
Standard Implementations
+
Reusable Algorithms




Table of cotents
1. Collections Framework
   1.1 Collection Interface
   1.2 Iterable Interface


2. List
   2.1 ArrayList
   2.2 LinkedList


3. Set
   3.1 HashSet
   3.2 LinkedHashSet


4. Map
   4.1 HashMap
   4.2 LinkedHashMap
   4.3 Hashtable


5. Equality Concepts
   5.1 Reference Equality
   5.2 Value Equality
   5.3 equals() Method
   5.4 hashCode() Method


6. HashMap Internal Working
   6.1 Buckets
   6.2 Hashing
   6.3 Collision Handling
   6.4 Treeification


7. Load Factor & Resizing


8. User Defined Objects as HashMap Keys


9. HashMap vs Hashtable




Collections
1. equals() method of Object class
2. hashcode() method
3. Examples of Array Resize
4. Reference Equality vs Value Equality
5. Load Factor(defines when it will resize)
6. How to create java hashmaop of user defined class
7. How ArrayList Regrows (Step-by-Step)?
8. hashCode()-> determines bucket location/index
9. equals() -> to find node from bucket location since bucket holds Linkedlist as values
10. hashCode() is used to find the bucket (location)
    equals() is used to resolve collisions


11:  Is hashCode() only used for hash-based collections?
Mostly yes.


hashCode() is primarily used by hash-based data structures, such as:


12. Default hascode()
    The default implementation of Object.hashCode() gives each object a hash code that's typically derived from its identity. In most JVM implementations this is related to the object's identity, not its field values.


13. Thus if 2 objects are equals based on certains fields, like a User class has name, address. But if 2 user has same name, then should be stored in similar bucket.
    both user's address can be different. Hence hascode() should return same bucket- this can be possible by overriding hashcode() method to caluclate hascode based on name.








Fail-Fast(structural modification -> Throws ConcurrentModificationException) vs Fail-Safe(structural modification ->No exception)
Fail-Fast(structural modification -> Throws ConcurrentModificationException)

Examples:
ArrayList
HashMap
HashSet
LinkedList


Characteristics:
Detects structural modification
Throws ConcurrentModificationException
Uses modCount


Fail-Safe(structural modification ->No exception)


Examples:
CopyOnWriteArrayList
ConcurrentHashMap (its iterators are weakly consistent)


Characteristics:
No exception
Iterates over a snapshot or tolerates concurrent changes
Safe for concurrent modifications


Which Collections Are Fail-Fast?
ArrayList
LinkedList
HashMap
HashSet
TreeMap
TreeSet
Vector (its iterators are fail-fast, even though individual methods are synchronized)


Which Collections Are Fail-Safe / Concurrent?
CopyOnWriteArrayList
ConcurrentHashMap
ConcurrentLinkedQueue
ConcurrentSkipListMap
ConcurrentSkipListSet


Interview Questions
Q1. Why does ConcurrentModificationException occur?
Because a collection is structurally modified while it is being traversed by a fail-fast iterator. The iterator detects that the collection's modCount has changed unexpectedly.


Q2. Is ConcurrentModificationException related only to multithreading?
No.
It can occur in a single thread if you modify the collection directly while iterating over it.


Q4. Why doesn't iterator.remove() throw ConcurrentModificationException?
Because it updates both the collection's modCount and the iterator's expectedModCount, keeping them synchronized.




Concurrent Modifications
What is a Structural Modification?
A structural modification is any operation that changes the size or structure of the collection.


How Does Fail-Fast Work Internally?
It uses modcount before iteration that has value equal to size of list.


================
1. If any structure modification is done after creation of iterator, it will throw ConcurrentModificationException.


2. ConcurrentModificationException is a fail-fast exception thrown by many Java Collection classes (such as ArrayList, HashMap, HashSet) when a collection is structurally modified while it is being iterated by an iterator.


3. Important: Despite its name, it is not only about multiple threads. It can happen even in a single-threaded program.


What is a Structural Modification?
A structural modification is any operation that changes the size or structure of the collection.


Examples:
add()
remove()
clear()
put() (for HashMap)
putAll()




Not structural modifications:
Updating an existing value in a HashMap
set(index, value) in an ArrayList (size doesn't change)


list.set(0, "Java");
No ConcurrentModificationException because the list size remains the same.


Why Does Java Throw This Exception?
The iterator assumes the collection won't change unexpectedly.
Iterator<String> iterator = list.iterator();


If someone modifies the collection while the iterator is traversing it, the iterator may:


Skip elements
Read the same element twice
Read invalid positions
Produce inconsistent results


Instead of allowing unpredictable behavior, Java immediately throws a ConcurrentModificationException.


This is called Fail-Fast Behavior.




How Does Fail-Fast Work Internally?
Every fail-fast collection maintains a field called:
modCount


Every structural modification increments modCount.
Example:
ArrayList
modCount = 0
After:
list.add("A");
modCount = 1
After:
list.add("B");
modCount = 2


When an iterator is created:
Iterator<String> it = list.iterator();
The iterator stores:
expectedModCount = modCount
Suppose:
modCount = 2
expectedModCount = 2


Now:
list.add("C");
Collection becomes:
modCount = 3
Iterator still has:
expectedModCount = 2
Next time:
it.next();
Iterator checks:
if(modCount != expectedModCount)
throw new ConcurrentModificationException();
Since:
3 != 2
Exception is thrown.






ArrayList(good for search) vs LinkedList(elements +metadata+ good for insert delete) | Data structure vs performance charateristics(Insertion, deletion)
ArrayList uses a dynamic Object array internally, where elements are stored in contiguous memory locations. Since elements are stored in an array, ArrayList provides fast random access using indexes.




LinkedList uses a doubly linked list data structure internally. Each element is stored inside a Node object.


A Node contains:
The actual data (element)
Reference to the previous node (prev)
Reference to the next node (next)


So unlike ArrayList, elements are not stored continuously in memory. Instead, nodes are connected through references.


Use case:
LinkedList is useful when frequent insertions, deletions, or navigation between neighboring elements are required.


Each node stores references to the previous and next nodes, so operations like browser history navigation, undo-redo functionality, playlists, queues, and deques can be implemented efficiently. However, random access is slow because elements must be traversed node by node, which is why ArrayList is generally preferred for most applications.




Visual Representation


ArrayList
[10][20][30][40]
Internally:
Object[] elementData


LinkedList
null ← [10] ⇄ [20] ⇄ [30] ⇄ [40] → null
Internally:
class Node<E> {
E item;
Node<E> prev;
Node<E> next;
}

Because ArrayList stores elements in an array, accessing an element by index is very fast (O(1)). However, inserting or deleting elements in the middle requires shifting elements.


In LinkedList, insertion and deletion are efficient because only node references need to be updated, but accessing an element requires traversing the list node by node, making it slower (O(n)).








How ArrayList Regrows (Step-by-Step)?
How ArrayList Regrows (Step-by-Step)
Suppose:
ArrayList<Integer> list = new ArrayList<>();
1. Initially No Real Array is Created
   ArrayList
   |
   ---> Empty Array
   When first element is added:
   list.add(10);
   Java creates an internal array of default capacity 10.
   Capacity = 10


[10][_][_][_][_][_][_][_][_][_]


2. Elements Keep Getting Added
   list.add(20);
   list.add(30);
   ...
   list.add(100);
   After 10 elements:
   Capacity = 10
   Size = 10


[1][2][3][4][5][6][7][8][9][10]
Array is full now.


3. Add One More Element
   list.add(11);
   Before inserting, ArrayList checks:
   size == capacity ?
   10 == 10
   ✅ Yes, array is full.


4. ArrayList Calls grow()
   grow(minCapacity);
   where
   minCapacity = 11
   because we need space for the 11th element.


5. Calculate New Capacity
   Formula:
   newCapacity =
   oldCapacity + (oldCapacity >> 1);
   or
   newCapacity =
   oldCapacity + oldCapacity/2;
   Example:
   Old Capacity = 10


New Capacity
= 10 + 5
= 15


6. Create New Bigger Array
   Old Array:
   [1][2][3][4][5][6][7][8][9][10]
   New Array:
   [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
   Capacity = 15


7. Copy Old Elements
   Java performs:
   Arrays.copyOf(...)
   Result:
   [1][2][3][4][5][6][7][8][9][10][_][_][_][_][_]


8. Update Reference
   Old array reference is replaced:
   elementData
   |
   V
   New Array
   Old array becomes eligible for Garbage Collection.


9. Insert New Element
   list.add(11);
   Now:
   [1][2][3][4][5][6][7][8][9][10][11][_][_][_][_]


Growth Pattern
ArrayList grows approximately by 50% every time.
10
↓
15
↓
22
↓
33
↓
49
↓
73
↓
109
Formula:
newCapacity =
oldCapacity + oldCapacity/2




Collection Interface
What is Collection Interface?


The Collection Interface is the root interface of the Java Collections Framework for storing and manipulating a group of objects.


public interface Collection<E> extends Iterable<E> {
int size();
boolean isEmpty();
boolean contains(Object o);
Iterator<E> iterator();
Object[] toArray();
boolean add(E e);
boolean remove(Object o);
boolean containsAll(Collection<?> c);
void clear();
boolean retainAll(Collection<?> c);


}


Iterable
│
Collection
│
┌──┴──────┐
List                                 Set


It is present in:
java.util.Collection


Definition
public interface Collection<E> extends Iterable<E>


This means:
Collection inherits all functionality of Iterable


Any collection can be traversed using:
for-each loop
Iterator


Example:
Collection<String> names = new ArrayList<>();


names.add("Amit");
names.add("John");


for(String name : names){
System.out.println(name);
}


Why Do We Need Collection Interface?


Imagine Java had only:
ArrayList
HashSet
LinkedList


Each class would have different method names.
Collection interface provides a common contract.


Common operations:
add()
remove()
contains()
size()
isEmpty()
clear()
iterator()
can be used on any Collection implementation.


Example:
Collection<String> data = new ArrayList<>();
Later you can change it to:


Collection<String> data = new HashSet<>();
without changing much code.




Example of ArrayList Resize
Default Capacity: 10 Elements
Loadfactor: .5 or 50% (i.e once full, next time it will increase only 50% of current size)


Dynamic Resizing: capacity full? then create new array 1.5 time size >> copy elements >> insert new element >> abandon old array and marked it for garbage collection >> update reference


================
Example: I have to insert 15 elements
Default List created with 10 items.


When you try to insert the 11th element into an ArrayList with the default initial capacity of 10, the ArrayList will:


Increase its Capacity: The ArrayList automatically resizes to accommodate more elements. It usually increases the capacity by 1.5 times the current size. So, with 10 elements, it will grow to a capacity of 15.


Copy Elements to New Array: Internally, the ArrayList creates a new, larger array with this increased capacity (15 slots) and copies the existing elements over.


Add the New Element: After resizing, the ArrayList adds the 11th element to the next available position.










Reference Equality vs Value Equality
Reference is about 2 object if they refer to same memory address or not.


While value checks whether 2 objects has same value. In case of Beans check whether they have same content like first and last name.








hascode() method must used with equals() so Hashset,Hasmap will work properly| hascode()-> find bucket | equals() -> to resolve collision by fetching node from bucket, collision
-> Hash-based collections first use hashCode() to locate a bucket, and then use equals() to resolve collisions. If hashCode() is not consistent with equals(), equal objects may end up in different buckets, causing duplicates and lookup failures.


hashCode() is used to find the bucket (location)
equals() is used to resolve collisions


🔥 Real Scenario (Exactly What You’re Thinking)
Let’s say:
User u1 = new User("test@gmail.com", "Amit");
User u2 = new User("test@gmail.com", "Amit");
You defined:
equals() → based on email
hashCode() → based on email


🚀 What Happens in HashSet
Step 1: hashCode()
u1 → bucket 101
u2 → bucket 101 ✅ (same key)


Step 2: equals()
u1.equals(u2) → TRUE


✅ Final Result:
👉 Only ONE object stored
✔️ Duplicate avoided
===============================


Q1: What does the hashCode() method do?
A1:
--The hashCode() method gives an integer based on the object’s data. This integer helps hash-based collections like HashMap know where to put the object.


Q2: Why override hashCode() when you override equals()?
A2:
--If equals() says two objects are the same, their hashCode() must also return the same number. This keeps hash-based collections working correctly.


Q3: What rules should hashCode() follow?
A3:
--Always return the same number if the object doesn’t change.
--Objects that are equal (by equals()) must have the same hash code.
--The method should run quickly and spread out the hash codes evenly.


Q5: What problems occur if hashCode() is not overridden?
A5:
--If only equals() is changed and not hashCode(), two objects that are equal might end up in different places in a HashMap, leading to errors.


Q6: What makes a good hashCode() method?
A6:
--It should use the same properties as equals() to calculate the hash.
--The method should evenly distribute objects across possible hash values to reduce the chance of two objects having the same hash code.




==============Use Case=============
Q1: What happens when you override equals() but not hashCode() in a custom class used outside collections?
A1:
Outcome: When you override equals() to check for logical equality based on certain fields (like name and age), without overriding hashCode(), you modify how objects are considered equal. However, their hash codes, based on the default implementation from Object, remain tied to their memory addresses.


Effect: This discrepancy doesn't affect operations outside collections since hashCode() is irrelevant for general object comparisons or operations not involving hash tables.




Q2: How does overriding equals() but not hashCode() affect usage in hash-based collections?
A2:
Outcome: If equals() is overridden to compare fields like name and age, but hashCode() is not, two objects considered equal by equals() may have different hash codes.


Effect in Collections: This inconsistency can lead to problems in hash-based collections like HashSet or HashMap, where objects that should be considered duplicates (because they are equal by the overridden equals() method) are treated as different due to differing hash codes.


Q3: What is the recommended practice when overriding equals() in custom classes used in collections?
A3:
Outcome: When you override equals(), you should also override hashCode() to ensure that objects that are considered equal also return the same hash code.


Effect in Collections: This alignment ensures that hash-based collections such as HashSet and HashMap function correctly, storing and retrieving objects based on logical equality and avoiding issues with object identification and retrieval.




Q4: What happens when both equals() and hashCode() are correctly overridden?
A4:
Outcome: Overriding both equals() and hashCode() ensures that objects are compared based on their content (like fields) and that equal objects (by overridden equals()) always return the same hash code.


Effect in Collections: This guarantees that collections operate as intended, without duplicate entries for logically equal objects and efficient retrieval based on hash codes.




Topic 9: hashCode()
Purpose
hashCode()
│
▼
Bucket Location
Used by:
HashMap
HashSet
Hashtable


Contract
equals() == true
↓
hashCode() must be same


Collection Flow
hashCode()
│
Find Bucket
│
equals()
│
Resolve Collision




equals() method of Object | usually overridden by Wrapper and String class | default: check if 2 object refer to same memory
-- usually overridden by Wrapper and String class to check by value.
-- if custom class don't override it, then equals will check 2 object's memory reference


============
1. Default Object class method.


    public boolean equals(Object obj) {
        return (this == obj);
    }


2. Reference Equality:
   The default equals() method checks if two object references point to the same memory location. This is known as reference equality or identity comparison.


3. Return Values:
   If both references point to the same object, equals() returns true.
   If the references point to different objects, equals() returns false.


4. Purpose of Default Implementation:
   --The purpose of this default behavior is to ensure a basic method of equality that can be universally applied without additional coding unless specifically overridden.


-It serves as a safe baseline for objects where deeper equality based on content is not yet defined.


5. Common Usage:
   In many cases, especially for complex objects, this implementation is not useful beyond basic identity checks. It's common to override this method to provide a meaningful equality check based on the object's fields.
   ======================================================
   Problem Statement


Imagine we have a Book class in Java, and we want to compare different Book instances based on their ISBN numbers to check if they refer to the same book.
The Book Class with equals() Method


public class Book {
private String isbn;


    public Book(String isbn) {
        this.isbn = isbn;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Book book = (Book) obj;
        return isbn.equals(book.isbn);
    }
}
=============================
Simple Questions and Answers
Q1: What does equals() do by default in Java?
A1:
By default, the equals() method in Java compares the memory addresses of two objects, meaning it checks if both references point to the exact same object instance.


Q2: How do you check if two Book instances are the same based on their ISBN?
A2:
You override the equals() method to compare the ISBN fields of the books instead of their memory addresses.


Q3: Why do you check this == obj in equals() method?
A3:
This check is used to determine if the two references point to the exact same object, which is a quick way to confirm equality without further computation.


Q4: What is the importance of getClass() check in equals()?
A4:
The getClass() check ensures that the objects being compared are of the exact same runtime class, which prevents a class from being erroneously considered equal to its subclass or another class.


Q5: What happens if equals() is overridden but hashCode() is not?
A5:
If hashCode() is not overridden, it might not be consistent with equals(). This inconsistency can lead to incorrect behavior in collections like HashSet or HashMap, where two objects considered equal by equals() should have the same hash code.




How to create a Java HashMap of user defined class type? | hashCode()-> determines bucket location | equals() -> to find node from bucket location since bucket holds Linkedlist as values
Why we need to override hashcode method?


- The hashCode() method is used by hash-based data structures to determine the bucket (location)
- if rely on default implementation, it may not distribute objects efficiently across buckets.
  -- This can lead to poor performance, as many objects could end up in the same bucket, resulting in longer search times.


e.g. HashMap<Student, String>
Solution:
1. OverRide Hashcode
2. Override equals.


These methods are used by the HashMap to determine the bucket location of keys and to check for key equality, respectively.


Since change in state of key results in generation of new hashCode, So we need to make key immutable. In Hashcode function use some static property to calculate hashcode.




Note:
1. The contract between hashCode() and equals()
2. we should be able to retrieve the value object back from the map without failure
3. If Object state changes, new hashcode for existing key will be evaluated.
4. Make HashMap key object immutable






Load Factor(defines when it will resize)
It tells when an array/list/map should resize.


1. It only tells logic of resizing(i.e when it will grow). Definitely it will reserve 16 blocks initially.
2. load factor defines when it will grow 16 to 32. 0.75 means when 75% map is fill, double the size.
3. It will grow 16-->32-->64. That is in the power of 2.


e.g


--After the first resizing (16 to 32):
The resize threshold becomes 0.75 * 32 = 24.
When the number of elements reaches 24, the map is resized to approximately double the current capacity again, i.e., 64.


--After the second resizing (32 to 64):
The resize threshold becomes 0.75 * 64 = 48.
When the number of elements reaches 48, the map is resized to approximately double the current capacity again, i.e., 128.




1. HashMap:


In a HashMap, the load factor is a measure of how full the map is allowed to get before its capacity is automatically increased (rehashing).
The default load factor is 0.75, which means that a HashMap will be resized (rehashed) when it is 75% full.


// Example of creating a HashMap with a custom load factor
Map<String, Integer> customLoadFactorMap = new HashMap<>(16, 0.5f);
In this example, the initial capacity is set to 16, and the load factor is set to 0.5.


=====================
2. HashSet:
   HashSet uses the same load factor mechanism as HashMap because HashSet is essentially a HashMap without values (only keys).


// Example of creating a HashSet with a custom load factor
Set<String> customLoadFactorSet = new HashSet<>(16, 0.5f);


Here, the initial capacity is set to 16, and the load factor is set to 0.5.


======================
Why Load Factor Matters:


1. A smaller load factor means the collection will be resized (rehashed) less often, but it will consume more memory initially.


small load factor==more memory===less resize


2. A larger load factor means the collection will be resized more often, but it will be more memory-efficient.


big load factor==memory effecient===resize frequently




Adjusting the load factor is a trade-off between memory consumption and performance.
Choosing an appropriate load factor depends on factors such as the expected size of the collection and the desired balance between memory usage and the frequency of resizing operations.


====================
import java.util.HashMap;
import java.util.Map;


public class LoadFactorExample {
public static void main(String[] args) {
// Default load factor is 0.75
Map<String, Integer> defaultLoadFactorMap = new HashMap<>();
populateMap(defaultLoadFactorMap);
System.out.println("Default Load Factor Map Size: " + defaultLoadFactorMap.size());


        // Custom load factor of 0.5
        Map<String, Integer> customLoadFactorMap = new HashMap<>(16, 0.5f);
        populateMap(customLoadFactorMap);
        System.out.println("Custom Load Factor Map Size: " + customLoadFactorMap.size());
    }


    private static void populateMap(Map<String, Integer> map) {
        for (int i = 1; i <= 100; i++) {
            map.put("Key" + i, i);
        }
    }
}


Default Load Factor (0.75):
The default HashMap constructor creates a map with an initial capacity of 16 and a load factor of 0.75.


In the example, we add 100 elements to the map. The resizing (rehashing) occurs when the number of elements reaches 0.75 * 16 = 12.
So, the default load factor map will be resized when it has 12 or more elements.


Custom Load Factor (0.5):
The custom load factor HashMap constructor creates a map with an initial capacity of 16 and a load factor of 0.5.


In this case, resizing occurs when the number of elements reaches 0.5 * 16 = 8.
Therefore, the custom load factor map will be resized when it has 8 or more elements.
So, you're correct. The default load factor map will resize after 12 elements, while the custom load factor map will resize after 8 elements. This illustrates how adjusting the load factor affects the resizing behavior and, consequently, the memory usage and efficiency of the HashMap.




Topic 9: hashCode()
Purpose
hashCode()
│
▼
Bucket Location


Used by:
HashMap
HashSet
Hashtable


Contract
equals() == true
↓
hashCode() must be same


Collection Flow
hashCode()
│
Find Bucket
│
equals()
│
Resolve Collision








LinkedHashMap:(Maintains the Insertion Order) | Keys are sorted by LRU if access order=true| default access order=false
Hashmap uses hascode-> so no insertion order.
LinkedHashMap-> Maintains the Insertion Order


class LinkedHashMap<K,V>   extends HashMap<K,V>     implements Map<K,V>


This MAP Maintains the Insertion Order.
Extends HashMap and Map.


• It stores key-value pairs similar to HashMap.
• It contains only unique keys. Duplicate keys are not allowed.
• It may have one null key and multiple null values.
• It maintains the order of K,V pairs inserted to it by adding elements to internally managed doubly-linked list.
•   default initial capacity (16) and load factor (0.75)
•   When Access Modifier is true, it follows LRU.


==========================================
2.2. Access ordered LinkedHashMap


LinkedHashMap<Integer, String> pairs = new LinkedHashMap<>(2, .75f,true);


keys are sorted on the basis of access order last time.
The keys are sorted from least recently accessed used to most recently accessed and build a LRU cache.
===========================================
3. LinkedHashMap Constructors


1. LinkedHashMap(): initializes a default LinkedHashMap implementation with the default initial capacity (16) and load factor (0.75).
2. LinkedHashMap(int capacity): initializes a LinkedHashMap with a specified capacity and load factor (0.75).
3. LinkedHashMap(Map map): initializes a LinkedHashMap with same mappings as the specified map.
4. LinkedHashMap(int capacity, float fillRatio): initializes LinkedHashMap with specified initial capacity and load factor.
5. LinkedHashMap(int capacity, float fillRatio, boolean Order): initializes both the capacity and fill ratio for a LinkedHashMap along with whether to maintain the insertion order or access order.
   • 'true' enable access order.
   • 'false' enable insertion order. This is default value behavior when using other constructors.


==================================================
6. LinkedHashMap Performance


LinkedHashMap has to maintain a doubly-linkedlist and HashMap maintain only linked list. Thus it is worse
====================================


When -- 'true' enable access order.
1. The key which is accessed recently, moved to last of map. Since Most recently used key is always at the end, bcoz it inserted very recently or accessed recently.


2. So, new key will replace entry from top, since top key is Least recently used.








LinkedHashSet(Insertion Order Maintains + 1 null value+ not synchronized+ ) | solves problem of Hashset insertion order
LinkedHashSet Features
• It extends HashSet class which extends AbstractSet class.
• It implements Set interface.
• Duplicate values are not allowed in LinkedHashSet.
• One NULL element is allowed in LinkedHashSet.
• It is an ordered collection which is the order in which elements were inserted into the set (insertion-order).
• Like HashSet, this class offers constant time performance for the basic operations(add, remove, contains and size).
• LinkedHashSet is not synchronized. If multiple threads access a hash set concurrently, and at least one of the threads modifies the set, it must be synchronized externally.
• Use Collections.synchronizedSet(new LinkedHashSet()) method to get the synchronized LinkedHashSet.
• The iterators returned by this class’s iterator method are fail-fast and may throw ConcurrentModificationException if the set is modified at any time after the iterator is created, in any way except through the iterator’s own remove() method.
• LinkedHashSet also implements Searlizable and Cloneable interfaces.
• Default initial capacity is 16, load factor .75


===========================================
6. LinkedHashSet Usecases


LinkedHashSet: ArrayList(Insertion Order) +HashSet(No duplicate)






Hashset
A HashSet is a class that implements the Set interface and stores unique elements only.
Internally, HashSet uses a HashMap for storage.


Interview Definition
HashSet is an implementation of the Set interface that stores unique elements and does not maintain insertion order. Internally, it uses a HashMap where elements are stored as keys and a constant dummy object is stored as the value.


Hierarchy
Iterable
│
Collection
│
Set
│
HashSet




public class HashSet<E>   extends AbstractSet<E>
implements Set<E>, Cloneable, java.io.Serializable


Data structure: Hashmap


private transient HashMap<E,Object> map;


public class HashSet<E> extends AbstractSet<E> implements Set<E>, Cloneable, Serializable


1. Use Hashing for storage
2. unique elements only.
3. allows null value.
4. not synchronized.
5. No insertion order.
6. best approach for search operations.
7. The initial default capacity of HashSet is 16, and the load factor is 0.75.


Features
1. No Duplicate Elements
   Set<String> set = new HashSet<>();


set.add("Java");
set.add("Java");
Result:
Java
Duplicate is ignored.


2. One Null Value Allowed
   set.add(null);
   Valid.


3. No Insertion Order
   set.add("A");
   set.add("B");
   set.add("C");


Output may be:
C
A
B
HashSet does not guarantee ordering.


4. Not Synchronized
   Multiple threads can modify it simultaneously.
   For synchronization:
   Collections.synchronizedSet(
   new HashSet<>()
   );


===============================
working


1. When we create an object of HashSet, it will create an object of HashMap
2. Here elements are stored as keys, values are constant placeholder associated with key.
2. Put that element E here "India" as a key into the HashMap
3. Java  put some dummy value(PRESENT) for the key.
   private static final Object PRESENT = new Object();
   public boolean add(E element) {
   return map.put(element, PRESENT) == null;
   }


If the Key is unique, then add and return true
If the Key is duplicate, then return false bcoz already present.


4. No Dummy Key: Unlike some older implementations of HashSet that used a dummy key, modern implementations use the actual element as the key. The constant value associated with each key serves as a placeholder.


HashSet Internally Uses HashMap
Source code:
private transient HashMap<E,Object> map;
When you create:
HashSet<String> set =
new HashSet<>();
Java internally creates:
HashMap<String,Object>


How add() Works
Suppose:
set.add("India");
Internally:
map.put("India", PRESENT);
where
private static final Object PRESENT
= new Object();
HashSet stores:
Key      Value


India -> PRESENT
The value is never used.
Only the key matters.


Actual Internal Code
Simplified:
public boolean add(E e) {
return map.put(e, PRESENT)
== null;
}


What Happens for Duplicate?
First:
set.add("India");
Internally:
map.put("India", PRESENT);
Added successfully.


Second:
set.add("India");
HashMap sees key already exists.
Result:
Not Added
This is why HashSet prevents duplicates.


How HashSet Detects Duplicates
Uses:
hashCode()
↓
Find Bucket


equals()
↓
Check Equality
Exactly like HashMap.
Example:
User u1 =
new User("amit@gmail.com");


User u2 =
new User("amit@gmail.com");
If:
equals()
hashCode()
are properly overridden,
then:
u1 == u2 logically
Only one object gets stored.




Topic 5: HashSet
Internal Structure
HashSet
│
▼
HashMap
│
▼
Key = Element
Value = PRESENT
private static final Object PRESENT = new Object();


Features
Unique Elements
One Null
Fast Search
No Order


Working
add("India")
│
▼
HashMap.put("India", PRESENT)


Duplicate?
│
├─ Yes → False
│
└─ No → True






Collections Framework and Types of interface
1.1 Collection


1. Collection extends Iterable{}
2. forEach default iterator is also added in Java 8 Iterable interface
3. All other collection interfaces and classes (except Map) either extend or implement this interface.
   ==================
   1.2. List


1. elements are ordered.
2. duplicates are allowed
3. arrayList, CopyOnWriteArrayList, LinkedList, Stack and Vector.


==================
1.3. Set


1. elements are sorted
2. no duplicate elements allowed
3. insertion order not maintained because of sorting.
4. some sets implementation maintains natural ordering (because of comparable interface, which is implemented by String and wrapper class).
5. ConcurrentSkipListSet, CopyOnWriteArraySet, EnumSet, HashSet, LinkedHashSet and TreeSet.


=========================
1.4. Map


1. The Map interface enable us to store data in key-value pairs .
2. No duplicate key, but multiple duplicate values.
3. MaP like TreeMap guarantee ordering.
   4.ConcurrentHashMap, ConcurrentSkipListMap, EnumMap, HashMap, Hashtable, IdentityHashMap, LinkedHashMap, Properties, TreeMap and WeakHashMap.




Iterable Interface
The Iterable interface is the root interface that enables an object to be traversed (iterated) using a for-each loop.


Since Collection extends Iterable, all List, Set implementations automatically become iterable.


Java 8 also added default methods like forEach() and spliterator() to support functional programming and parallel processing.


Hierarchy:
Iterable
│
Collection
│
┌─┴─────┐
List                          Set






public interface Iterable<T> {


Iterator<T> iterator();//abstract iterator


//default foreach
default void forEach(Consumer<? super T> action) {
Objects.requireNonNull(action);
for (T t : this) {
action.accept(t);
}
}
//spliterator sprit iterator
default Spliterator<T> spliterator() {
return Spliterators.spliteratorUnknownSize(iterator(), 0);
}
}




ArrayList | ordered->duplicate->indexed->Resizeable->Not sync
ArrayList: (Data Structure: Arrays)


private transient Object[] elementData;
private static final int DEFAULT_CAPACITY = 10;
private Object[] grow(int minCapacity)


Ordered
Duplicate Allowed
Index Based
Dynamic Resizing
Not Synchronized


Resize:
if original array full >> create new array with 50% more size >> copy original data>> insert new data >> discard original array


int newCapacity =     ArraysSupport.newLength(oldCapacity,
minCapacity - oldCapacity,
oldCapacity >> 1 //grow by 50%
);


oldCapacity >> 1, -> Bitwise right shift.  Equivalent to: oldCapacity / 2


====================
1. Contains Resizeable list of objects.
2. Java ArrayList class extends AbstractList class which implements List interface. The List interface extends Collection and Iterable interfaces in hierarchical order.
3. ArrayList basically can be seen as resizable-array implementation in Java.
4. Default size=10


public class ArrayList<E> extends AbstractList<E>
implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
private static final int DEFAULT_CAPACITY = 10;
}
heirarchy
AbstractList > List > Collection


Marker interfaces:
RandomAccess, Cloneable, Serializable


============================


ArrayList Features


1. Ordered – Elements in arraylist preserve their ordering which is by default the order in which they were added to the list.
2. Index based – Elements can be randomly accessed using index positions. Index start with '0'.
3. Dynamic resizing – ArrayList grows dynamically when more elements needs to be added than it’s current size.
4. Non synchronized – ArrayList is not synchronized, by default. Programmer needs to use synchronized keyword appropiately or simply use Vector class.
5. Duplicates allowed – We can add duplicate elements in arraylist. It is not possible in sets.


=============================


2. Internal Working of ArrayList(Backup array is used to perform all operation and then copied to original)


Default size=10
grow() function is called.


private Object[] grow(int minCapacity) {
int oldCapacity = elementData.length;
if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
int newCapacity = ArraysSupport.newLength(oldCapacity,
minCapacity - oldCapacity, /* minimum growth */
oldCapacity >> 1           /* preferred growth */);
return elementData = Arrays.copyOf(elementData, newCapacity);
} else {
return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
}
}




ArrayList class is implemented around backing array. The elements added or removed from arraylist are actually modified in this backing array. All arraylist methods access this array and get/set elements in the array.


ArrayList basically can be seen as resizable-array implementation in Java.


==============================
3. How ArrayLists grow in size?(Nearly 50 per-cent size improves)
   Grow function of Arraylist


Backing array pass value to arraylist--> backing arrays grows-->then new elements added into it.


1. Since all operations performs on backingarray, then size of backing will grow only.
2. ArrayList perform a check whether there is any space left in array or not using ensureCapacity() method.
3. int newCapacity = oldCapacity+ (oldCapacity >> 1), which is nearly 50%


Example
- As soon the original array capacity is full, so for next element create new array with 50% more capacity, then copy existing element, and then insert new element.
  Then discard original
  -No, the ArrayList in Java does not retain the original array after resizing.
  -Instead, it creates a new array with the increased capacity (usually 1.5 times the current size), copies all elements from the original array to this new array, and then abandons the original array.
  -- After that, the ArrayList reference is updated to point to this new, larger array.


----------------------------
Topic 3: ArrayList
Data Structure
ArrayList
│
└── Backing Array
private transient Object[] elementData;


Features
Ordered
Duplicate Allowed
Index Based
Dynamic Resizing
Not Synchronized




Internal Working
Array Full?
│
▼
Create New Array
(1.5x Capacity)
│
▼
Copy Old Data
│
▼
Insert New Element
│
▼
Discard Old Array


Resize Formula
newCapacity = oldCapacity + (oldCapacity >> 1)


Example:
10 → 15 → 22 → 33 → 49






Linked List: (Data Structure: Doubly-Linked list)
Linked List: (Data Structure: Doubly-Linked list)
transient int size = 0;
transient Node<E> first;
transient Node<E> last;


1. Java LinkedList class is doubly-linked list implementation of the List and Deque interfaces
2. Null can be added.
3. Duplicates allowed


public class LinkedList<E>
extends AbstractSequentialList<E>
implements List<E>, Deque<E>, Cloneable, java.io.Serializable{}


List -> Colleciton -> Iterable


ArrayList uses a dynamic Object array internally, where elements are stored in contiguous memory locations. Since elements are stored in an array, ArrayList provides fast random access using indexes.


=============================
2. LinkedList Features


1. Doubly linked list: can also be used as a Queue, Deque or Stack.
2. Null Allowed: Permits all elements including duplicates and NULL.
3. Insertion order maintained.
4. Not synchronized.
5. Use Collections.synchronizedList(new LinkedList()) to get synchronized linkedlist.
6. The iterators returned by this class are fail-fast and may throw ConcurrentModificationException.
7. It does not implement RandomAccess interface. So we can access elements in sequential order only. It does not support accessing elements randomly.
8. We can use ListIterator to iterate LinkedList elements.


===============================
Applications:
1. Undo-Redo operations from the last.
2. Next & previous
   ===========================


Drawbacks:
Overhead of various pointers like start end cause memory headache.


---------------------------------------------
Topic 4: LinkedList
Data Structure
Node
├── Prev
├── Data
└── Next


Features
-Doubly Linked List
- Null Allowed
  Duplicates Allowed
  Ordered
  Not Synchronized


Use Cases


LinkedList
│
├── Undo / Redo
├── Browser History
├── Queue
├── Deque
└── Stack












HashMap| implements Map, Cloneable, Serializable
Java 8 also added default methods like forEach() and spliterator() to support functional programming and parallel processing.


HashMap is a part of the Java Collections Framework and is an implementation of the Map interface.


Although it belongs to the Collections Framework, it does not implement the Collection interface because it stores data as key-value pairs rather than as a group of individual objects.


Q: Is HashMap a Collection?
A: No. HashMap is part of the Java Collections Framework, but it is not a Collection because it implements Map, not Collection.




Data Structure: Array of Nodes.
- Array of the node is called buckets.
- Each node has a data structure like a LinkedList


Default capacity is 16 with a load factor of 0.75.


hashCode() → Find Bucket
equals()   → Find Exact Key


Collision
↓
Linked List (Java 7)
↓
Red-Black Tree (Java 8+, if bucket becomes large)


transient Node<K,V>[] table; //array of Nodes, where table=node


Node<K,V> implements Map.Entry<K,V> {
final int hash;
final K key;
V value;
Node<K,V> next;
}


1. implements Map Interface
2. Store Key-value pairs
3. 1 Null key allowed
4. keys are unique. If duplicate keys, then new entry will override old value.
5. Stores Object references rather than value. thus int will be stored as Integer.
6. Hash Value of Key is calculated, thus unordered
7. Methods are not marked synchronized.
8.  Default capacity is 16 with a load factor of 0.75.


public class HashMap<K,V> extends AbstractMap<K,V>
implements Map<K,V>, Cloneable, Serializable  
====================================
2. Java HashMap Features


1. Key-Value Storage
   map.put(101, "Amit");
   Key    Value
   101 -> Amit


2. Unique Keys
   map.put(101, "Amit");
   map.put(101, "John");
   Result:
   101 -> John
   New value overrides old value.


3. One Null Key Allowed
   map.put(null, "Amit");
   Valid.


4. Multiple Null Values Allowed
   map.put(1, null);
   map.put(2, null);
   Valid.


5. Not Ordered
   HashMap does not guarantee insertion order.
   map.put(3,"C");
   map.put(1,"A");
   map.put(2,"B");
   Output may be:
   2 B
   1 A
   3 C

1. No duplicate keys.
2. Only one null key allowed. Multiple null key means new pair with null key override previous. As point 1 says no duplicate keys
3. Unordered collection. It does not guarantee any specific order of the elements.
4. Not Synchronized
5. A value can be retrieved only using the associated key.
6. HashMap stores only object references. So primitives must be used with their corresponding wrapper classes. Such as int will be stored as Integer.
7. HashMap implements Cloneable and Serializable interfaces.


======================================
Internal Working:


transient Node[] table;


1. For each key-value, Hashvalue is required. This is used to find where node will be stored in array.
   e.g map.put("Amit", 19);
   Index = hashcode("Amit") & (n-1)
   Index = 2657860 & (16-1) = 4


=> table[4] will contains node details.
========================
What about Collision?


If for 2 keys, indexes are same, then collision occurs.


1. If keys are same, then override.
2. If two different keys produce the same bucket index, connect new node to existing at same index like linked list before java 8 and since java 8 stores as Red-black tree
3. While retrieving the value by key, first index location is found using key’s hashcode.
   Then all elements are iterated in the linkedlist and correct value object is found by identifying the correct key's code(since key code is unique to each key, but index can be same for multiple keys).


=====================================
Concurrent Modifications.


1. if any structure modification is done after creation of iterator, it will throw ConcurrentModificationException.


=======================================
HashMap vs Hashtable


1.1. Synchronization
Hashtable is synchronized (i.e. methods defined inside Hashtable synchronized)


1.2. Null keys
Hashtable does not allow null keys or values. HashMap allows one null key


1.3. Legacy(i.e difficult to replace)
Hashtable is legacy class and was not part of the initial Java Collections Framework
HashMap is part of Collections since it’s birth
Hashtable extends the Dictionary class

1.4. Fail-fast iterator(structural modification -> Throws ConcurrentModificationException)
Iterator in the HashMap is fail-fast and throw ConcurrentModificationException if any other Thread modifies the map structurally by adding or removing any element except Iterator’s own remove() method.



Topic 7: HashMap
Data Structure
HashMap
│
└── Array of Buckets
│
├── Linked List
│
└── Red Black Tree
(Shown in the HashMap workflow diagram in the notes.)


Internal Structure
Node<K,V>
{
int hash;
K key;
V value;
Node next;
}


Hashing Flow
put(key,value)
│
▼
Calculate Hash
│
▼
Find Bucket Index
│
▼
Insert Node


Formula:
index = hash & (n-1)


Collision Handling
Same Index?
│
┌───┴────┐
│        │
No      Yes
│        │
Store    Linked List
│
▼
Red Black Tree




Collision Handling in HashMap
A collision occurs when two different keys produce the same bucket index.
Example:
map.put("Amit", 19);
map.put("John", 25);
Suppose:
hash("Amit") -> bucket 4
hash("John") -> bucket 4
Both keys want to be stored in bucket 4.


Before Java 8
HashMap handled collisions using a Linked List.
Bucket 4


[Amit,19]
|
v
[John,25]
|
v
[David,30]


Each node stores:


class Node<K,V> {
int hash;
K key;
V value;
Node<K,V> next;
}


When retrieving:
map.get("John");


HashMap:
Calculates bucket index.
Goes to bucket 4.


Traverses the linked list.
Uses equals() to find the matching key.


Java 8 Improvement
The problem with a long linked list is that lookup becomes:
O(n)


If many keys collide, performance degrades.


To solve this, Java 8 introduced treeification.
When the number of nodes in a bucket becomes large (typically more than 8 nodes, and table size is at least 64), the linked list is converted into a Red-Black Tree.


Before:


Bucket 4


Amit
|
John
|
David
|
Alex
|
Tom


Java 8 onward:
John
/    \
Amit     Tom
/         \
Alex        David


Now searching becomes:
O(log n) instead of:O(n)


Interview Answer
When two different keys generate the same bucket index, a collision occurs. Before Java 8, HashMap stored collided entries as a linked list within that bucket. Each node contained the key, value, hash, and a reference to the next node. During retrieval, HashMap traversed the linked list and used equals() to find the correct key. Starting from Java 8, if the number of collided entries in a bucket exceeds a threshold (8 nodes), the linked list is converted into a Red-Black Tree, reducing lookup time from O(n) to O(log n).




HashTable
Data Structure: Array of Entry(Key-value)


public class Hashtable<K,V>
extends Dictionary<K,V>
implements Map<K,V>, Cloneable, java.io.Serializable {
private transient Entry<?,?>[] table;


}


1. Hashtable is synchronized bcoz all methods are synchronized.
2. No null key(NullPointerException)
3. No null value(NullPointerException)
4. duplicates keys overridden
5. Default capacity: 11, Load factor: 0.75
   ====================
2. Hashtable Features


1. synchronized
2. It does not accept null key and value.
3. Duplicates keys overridden.
4. It stores key-value pairs in hash table data structure which internally maintains an array of list. Each list may be referred as a bucket. In case of collisions, pairs are stored in this list.
5. Enumerator in Hashtable is not fail-fast.