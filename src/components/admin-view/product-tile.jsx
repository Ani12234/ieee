import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock, MapPin, Users, Edit, Trash2 } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.5)",
      }}
      className="h-full group"
    >
      <Card className="h-full overflow-hidden border-gray-200 hover:border-violet-300 transition-all relative">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product?.image || "/placeholder.svg?height=200&width=400"}
            alt={product?.title || "Event"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product?.category && (
            <Badge className="absolute top-3 right-3 bg-violet-600 hover:bg-violet-700 capitalize">
              {product?.category}
            </Badge>
          )}
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold truncate">{product?.title}</CardTitle>
          <CardDescription className="line-clamp-2">{product?.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2 text-sm">
            {product?.date && (
              <div className="flex items-center text-gray-700">
                <Calendar className="mr-2 h-4 w-4 text-violet-500 flex-shrink-0" />
                <span>{product?.date}</span>
              </div>
            )}
            {product?.time && (
              <div className="flex items-center text-gray-700">
                <Clock className="mr-2 h-4 w-4 text-violet-500 flex-shrink-0" />
                <span>{product?.time}</span>
              </div>
            )}
            {product?.location && (
              <div className="flex items-center text-gray-700">
                <MapPin className="mr-2 h-4 w-4 text-violet-500 flex-shrink-0" />
                <span className="truncate">{product?.location}</span>
              </div>
            )}
            {product?.forWhom && (
              <div className="flex items-center text-gray-700">
                <Users className="mr-2 h-4 w-4 text-violet-500 flex-shrink-0" />
                <span className="truncate">For: {product?.forWhom}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-violet-500 text-violet-700 hover:bg-violet-50"
            onClick={() => {
              setFormData(product);
              setCurrentEditedId(product?.id);
              setOpenCreateProductsDialog(true);
            }}
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-red-500 text-red-600 hover:bg-red-50"
            onClick={() => handleDelete(product?.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default AdminProductTile;
