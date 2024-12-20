package safe_holiday.safe_holiday.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavorite is a Querydsl query type for Favorite
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavorite extends EntityPathBase<Favorite> {

    private static final long serialVersionUID = 242430630L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFavorite favorite1 = new QFavorite("favorite1");

    public final QSafeMember author;

    public final BooleanPath favorite = createBoolean("favorite");

    public final QHospital hospitalId;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QPharmacy pharmacyId;

    public QFavorite(String variable) {
        this(Favorite.class, forVariable(variable), INITS);
    }

    public QFavorite(Path<? extends Favorite> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFavorite(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFavorite(PathMetadata metadata, PathInits inits) {
        this(Favorite.class, metadata, inits);
    }

    public QFavorite(Class<? extends Favorite> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.author = inits.isInitialized("author") ? new QSafeMember(forProperty("author")) : null;
        this.hospitalId = inits.isInitialized("hospitalId") ? new QHospital(forProperty("hospitalId")) : null;
        this.pharmacyId = inits.isInitialized("pharmacyId") ? new QPharmacy(forProperty("pharmacyId")) : null;
    }

}

