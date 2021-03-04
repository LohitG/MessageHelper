"""
DSC 20 Mid-Quarter Project
Name: Lohit Geddam, Jad Makki
PID:  A16374851, A16640882
"""

# Part 1: RGB Image #
class RGBImage:
    """
    Create the class RGBImage which serves as a template for image objects
    which will be created as instances of RGBImage.
    """

    def __init__(self, pixels):
        """
        Initializes the attribute pixels, a 3 dimensional matrix, to
        the class.
        >>> x = RGBImage([[[[1, 2, 3]]], [[1, 2, 3]], [[1, 3, 4]]])
        >>> x.pixels
        [[[[1, 2, 3]]], [[1, 2, 3]], [[1, 3, 4]]]
        >>> x.pixels[0][0][0]
        [1, 2, 3]
        >>> my_pxl = [[[1, 2, 3]], [[1, 2, 3]], [[1, 3, 4]]]
        >>> y = RGBImage(my_pxl)
        >>> y.pixels[1][0][2]
        3
        """
        self.pixels = pixels  # initialze the pixels list here

    def size(self):
        """
        Returns the size of the image in a tuple (rows, columns)
        >>> my_lst = ([ \
        [ \
            [206, 138, 253, 211, 102, 194, 188, 188, 120, 231], \
            [204, 208, 220, 214, 203, 165, 249, 225, 198, 185], \
            [113, 196, 133, 235, 173, 179, 252, 105, 214, 238], \
            [152, 156, 143, 114, 166, 132, 106, 115, 116, 177], \
            [231, 193, 123, 154, 184, 242, 226, 155, 222, 223], \
        ], \
        [ \
            [214, 190, 173, 141, 248, 189, 105, 193, 125, 122], \
            [209, 136, 131, 187, 177, 186, 239, 222, 175, 152], \
            [239, 236, 177, 243, 183, 192, 114, 211, 147, 192], \
            [168, 119, 120, 182, 190, 108, 181, 219, 198, 127], \
            [251, 222, 205, 102, 104, 217, 234, 196, 131, 127], \
        ], \
        [ \
            [233, 188, 214, 175, 152, 174, 235, 174, 234, 149], \
            [163, 169, 131, 209, 232, 180, 238, 224, 152, 214], \
            [137, 135, 181, 146, 243, 210, 236, 107, 193, 200], \
            [230, 233, 206, 227, 150, 131, 177, 187, 143, 150], \
            [117, 188, 127, 166, 134, 219, 241, 108, 217, 202], \
        ], \
    ])
        >>> x = RGBImage(my_lst)
        >>> x.size()
        (5, 10)
        """
        return (len(self.pixels[0]), len(self.pixels[0][0]))

    def get_pixels(self):
        """
        Returns a deep copy of the pixels matrix provided in the
        Constructor.
        """
        return [list(list(row) for row in dim) for dim in self.pixels]

    def copy(self):
        """
        Returns a copy of the RGBImage instance
        """
        my_copy = RGBImage(self.get_pixels())
        return my_copy

    def get_pixel(self, row, col):
        """
        Returns the color of the pixel depending on the passed
        values for a row and column
        """
        assert all([isinstance(row, int), isinstance(col, int)])
        assert all([row <= self.size()[0], col <= self.size()[1]])
        rintensity = self.pixels[0][row][col]
        gintensity = self.pixels[1][row][col]
        bintensity = self.pixels[2][row][col]
        return (rintensity, gintensity, bintensity)

    def set_pixel(self, row, col, new_color):
        """
        Updates the intensity at position [row][col] for each color
        depending on the values given in new_color
        """
        assert all([isinstance(row, int), isinstance(col, int)])
        assert all([row <= self.size()[0], col <= self.size()[1]])
        for i in range(3):
            if new_color[i] != -1:
                self.pixels[i][row][col] = new_color[i]


# Part 2: Image Processing Methods #
class ImageProcessing:
    """
    Initializes the ImageProcessing class containing several methods that 
    can be used on image objects. 
    """

    @staticmethod
    def negate(image):
        """
        Returns the negative image of the provided image, inverting all
        pixel values
        """
        return RGBImage(list(map(lambda lst: list(map(lambda o: \
            list(map(lambda val: 255 - val, o)), lst)), \
            image.pixels)))
        

    @staticmethod
    def grayscale(image):
        """
        Converts the given image into grayscale, done by assigning the
        average of R,G,B to every component
        """
        m1 = 1
        m2 = 2
        m3 = 3
        temp_size = image.size()
        rows = temp_size[0]
        cols = temp_size[m1]
        return RGBImage([[[((image.pixels[0][j][k] + image.pixels[m1][j][k] + \
        image.pixels[m2][j][k]) // m3) for k in range(cols)] for j in \
        range(rows)] for i in range(len(image.pixels))])

    @staticmethod
    def clear_channel(image, channel):
        """
        Clears the channel specified in the input by setting all values in
        that channel to 0.
        """
        temp_size = image.size()
        rows = temp_size[0]
        cols = temp_size[1]
        return RGBImage([[[0 if  i == channel else image.pixels[i][j][k] \
            for k in range(cols)] for j in range(rows)] for i in \
            range(len(image.pixels))])

    @staticmethod
    def crop(image, tl_row, tl_col, target_size):
        """
        Crops the image to the liking of the user, who inputs a target
        row, column, and overall size. 
        """
        rows = image.size()[0]
        cols = image.size()[1]
        x = [[[image.pixels[i][j][k] for k in range(cols) \
            if ((j >= tl_row) and (j <= tl_row + target_size[0])) and \
            ((k >= tl_col) and (k <= tl_col + target_size[1]))]
            for j in range(rows)] for i in range(len(image.pixels))]
        my_x = list(map(lambda lst: list(filter(lambda val: \
            True if len(val) > 0 else False, lst)), x))
        return RGBImage(my_x)

    @staticmethod
    def chroma_key(chroma_image, background_image, color):
        """
        Takes the specified color and replaces it in the chroma_image with
        the color of the background image at those points. 
        """
        assert isinstance(chroma_image, RGBImage)
        assert isinstance(background_image, RGBImage)
        assert chroma_image.size() == background_image.size()
        chroma_img = chroma_image.pixels
        background_img = background_image.pixels
        rows = chroma_image.size()[0]
        cols = chroma_image.size()[1]
        for j in range(rows):
            for k in range(cols):
                curr_color = (chroma_img[0][j][k], chroma_img[1][j][k], chroma_img[2][j][k])
                if curr_color == color:
                    chroma_img[0][j][k] = background_img[0][j][k]
                    chroma_img[1][j][k] = background_img[1][j][k]
                    chroma_img[2][j][k] = background_img[2][j][k]

    # rotate_180 IS FOR EXTRA CREDIT (points undetermined)
    @staticmethod
    def rotate_180(image):
        """
        Rotates the image 180 degrees
        """
        img = image.pixels
        rows = image.size()[0]
        img = [[img[i][j][::-1] for j in range(rows)] for i in range(len(img))]
        img  = [img[i][::-1] for i in range(len(img))]
        return RGBImage(img)
        

# Part 3: Image KNN Classifier #
class ImageKNNClassifier:
    """
    Implementation of the ImageKNNClassifer class
    """

    def __init__(self, n_neighbors):
        """
        Constructer which initializes a class instance and variable of
        n_neighbors
        """
        self.n_neighbors = n_neighbors
        self.data = ()

    def fit(self, data):
        """
        Stores all training data in the classifier instance.
        """
        assert all([len(data) > len(self.n_neighbors), self.data == ()])
        self.data = data

    @staticmethod
    def distance(image1, image2):
        """
        Calculates the distance between image1 and image2 using Euclidean 
        distance
        """
        m1 = 1
        m2 = 2
        assert image1.size() == image2.size()
        flat_1 = [col for dim in image1.pixels for row in dim for col in row]
        flat_2 = [col for dim in image2.pixels for row in dim for col in row]
        dist = [((flat_1[i] - flat_2[i]) ** m2) for i in range(len(flat_1))]
        return sum(dist) ** (m1/m2)
        

    @staticmethod
    def vote(candidates):
        """
        Computes the most popular label from a list of labels
        """
        dictionary = {}
        for i in candidates:
            if i in dictionary.keys():
                dictionary[i] = dictionary[i] + 1
            else:
                dictionary[i] = 1
        max_value = max(list(dictionary.values()))
        dict_values = list(dictionary.values())
        dict_keys = list(dictionary.keys())
        for i in range(len(dict_values)):
            if dict_values[i] == max_value:
                return dict_keys[i]
        
        
    def predict(self, image):
        """
        Use the given data to predict the label of a given image using
        the KNN classification algorithm.
        """
        assert self.data != ()
        lst = [(ImageKNNClassifier.distance(image, i[0]),i[1]) for i in self.data]
        lst.sort()
        lst = lst[:self.n_neighbors]
        lst_labels = [i[1] for i in lst]
        return ImageKNNClassifier.vote(lst_labels)
            
