#!/usr/bin/python3


"""
0-pascal_triangle
"""


def pascal_triangle(n):
    """
    Design a pascal triangle using the int passed

    Args:
        n: int (the number of rows of the integer < n)
    """

    triangle = []  # triangle inits to list

    if n <= 0:
        return triangle

    for i in range(n):  # number of rows to print
        row = []  # each row value will be added here

        for j in range(i + 1):  # number of values in each row
            if i == 0:
                row.append(1)  # if first row, just append 1
                break

            prev_row = i - 1  # get the prev row
            prev_col = j - 1  # get the prev col

            # index error checking
            v1 = 0 if prev_col == -1 else triangle[prev_row][prev_col]
            v2 = 0 if j > (i - 1) else triangle[prev_row][j]

            sum_value = v1 + v2  # summing values
            row.append(sum_value)

        triangle.append(row)  # appending the rows in triangle

    return triangle


if __name__ == "__main__":
    print(pascal_triangle(5))